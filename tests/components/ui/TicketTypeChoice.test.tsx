import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import jest from "jest-mock";

import TicketTypeChoice, { isWorkshopsOnly } from "../../../src/components/ui/TicketTypeChoice";

describe("isWorkshopsOnly", () => {
    it("is true when the delegate picked Workshops Only", () => {
        expect(isWorkshopsOnly(false, true)).toBe(true);
    });

    it("is false when a non-performer picked the bundle", () => {
        expect(isWorkshopsOnly(false, false)).toBe(false);
    });

    it("is always true for performers, whatever was picked", () => {
        expect(isWorkshopsOnly(true, false)).toBe(true);
        expect(isWorkshopsOnly(true, true)).toBe(true);
    });
});

describe("TicketTypeChoice", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("offers both tickets to non-performers, with the current pick pressed", () => {
        render(<TicketTypeChoice isPerformer={false} workshopsOnlySelected={false} onChange={() => {}} />);

        expect(screen.getByRole("button", { name: "Workshops Only" })).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByRole("button", { name: "Workshops + Variety Show Bundle" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.queryByText(/Performers don't need/)).not.toBeInTheDocument();
    });

    it("reports the delegate's pick", async () => {
        const onChange = jest.fn();
        render(<TicketTypeChoice isPerformer={false} workshopsOnlySelected={false} onChange={onChange} />);

        await userEvent.click(screen.getByRole("button", { name: "Workshops Only" }));
        expect(onChange).toHaveBeenLastCalledWith(true);

        await userEvent.click(screen.getByRole("button", { name: "Workshops + Variety Show Bundle" }));
        expect(onChange).toHaveBeenLastCalledWith(false);
    });

    it("hides the bundle from performers and shows Workshops Only as the choice", () => {
        render(<TicketTypeChoice isPerformer={true} workshopsOnlySelected={false} onChange={() => {}} />);

        expect(screen.queryByRole("button", { name: "Workshops + Variety Show Bundle" })).not.toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Workshops Only" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText(/Performers don't need a Variety Show ticket/)).toBeInTheDocument();
    });

    it("brings the bundle back, still selected, when the performer box is unticked", () => {
        const { rerender } = render(
            <TicketTypeChoice isPerformer={true} workshopsOnlySelected={false} onChange={() => {}} />
        );

        rerender(<TicketTypeChoice isPerformer={false} workshopsOnlySelected={false} onChange={() => {}} />);

        expect(screen.getByRole("button", { name: "Workshops + Variety Show Bundle" })).toHaveAttribute("aria-pressed", "true");
        expect(screen.queryByText(/Performers don't need/)).not.toBeInTheDocument();
    });
});
