import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import UiucCodeInstructions from "../../../src/components/ui/UiucCodeInstructions";

describe("UiucCodeInstructions", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("standard: the guide shown under both ticket buttons", () => {
        render(<UiucCodeInstructions variant="standard" />);

        expect(screen.getByText("Using a UIUC discount code?")).toBeInTheDocument();
        const steps = screen.getAllByRole("listitem").map((li) => li.textContent);
        expect(steps).toEqual([
            'In the checkout below, click "Remove" next to the code that\'s already filled in.',
            "Enter your UIUC discount code, not the one ending in -VSHOW.",
            "Before proceeding, check that your ticket name ends in UIUC.",
        ]);
        expect(
            screen.getByText(
                "Variety Show Only tickets don't include workshops and can't be used to register here. No discount code? Leave the checkout as is."
            )
        ).toBeInTheDocument();
        expect(screen.getByText('"Remove"').tagName).toBe("B");
        expect(screen.getByText("UIUC", { selector: "b" })).toBeInTheDocument();
    });

    it("performer: two steps and the performer note", () => {
        render(<UiucCodeInstructions variant="performer" />);

        expect(screen.getByText("Using a UIUC discount code?")).toBeInTheDocument();
        const steps = screen.getAllByRole("listitem").map((li) => li.textContent);
        expect(steps).toEqual([
            "Enter your UIUC code in the checkout below. Use the regular code, not the one ending in -VSHOW.",
            "Before proceeding, check that your ticket name ends in UIUC.",
        ]);
        expect(
            screen.getByText("As a performer you don't need a Variety Show ticket. No discount code? Leave the checkout as is.")
        ).toBeInTheDocument();
        expect(screen.getByText("UIUC", { selector: "b" })).toBeInTheDocument();
    });
});
