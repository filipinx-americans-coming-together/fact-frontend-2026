import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import jest from "jest-mock";

import ExistingOrderPanel, { DifferentEmailOrderLink } from "../../../src/components/ui/ExistingOrderPanel";

const ONE_ORDER = [{ order_hint: "…9203", ticket_type: "bundle" }];
const TWO_ORDERS = [
    { order_hint: "…1234", ticket_type: "workshop" },
    { order_hint: "…5678", ticket_type: "bundle" },
];

function renderPanel(overrides: Partial<Parameters<typeof ExistingOrderPanel>[0]> = {}) {
    const props = {
        email: "jane@example.com",
        orders: ONE_ORDER,
        onLink: jest.fn(),
        onShowCheckout: jest.fn(),
        pending: false,
        errorMessage: null,
        ...overrides,
    };
    render(<ExistingOrderPanel {...props} />);
    return props;
}

describe("ExistingOrderPanel", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("shows the masked hint and tells the delegate not to buy again", () => {
        renderPanel();

        expect(screen.getByText(/jane@example\.com/)).toBeInTheDocument();
        expect(screen.getByText(/Order ending 9203/)).toBeInTheDocument();
        expect(screen.getByText(/Don't buy again/)).toBeInTheDocument();
        expect(screen.queryByText(/more than one order/)).not.toBeInTheDocument();
    });

    it("links with the trimmed order number", async () => {
        const props = renderPanel();

        await userEvent.type(screen.getByLabelText(/order number/i), "  12345679203  ");
        await userEvent.click(screen.getByRole("button", { name: "Link my ticket" }));

        expect(props.onLink).toHaveBeenCalledTimes(1);
        expect(props.onLink).toHaveBeenCalledWith("12345679203");
    });

    it("rejects an empty order number without calling the link callback", async () => {
        const props = renderPanel();

        await userEvent.type(screen.getByLabelText(/order number/i), "   ");
        await userEvent.click(screen.getByRole("button", { name: "Link my ticket" }));

        expect(props.onLink).not.toHaveBeenCalled();
        expect(screen.getByText(/Enter the order number/)).toBeInTheDocument();
    });

    it("links on Enter instead of submitting the surrounding form", async () => {
        const onSubmit = jest.fn((e: any) => e.preventDefault());
        const onLink = jest.fn();
        render(
            <form onSubmit={onSubmit}>
                <ExistingOrderPanel
                    email="jane@example.com"
                    orders={ONE_ORDER}
                    onLink={onLink}
                    onShowCheckout={() => {}}
                    pending={false}
                    errorMessage={null}
                />
            </form>
        );

        await userEvent.type(screen.getByLabelText(/order number/i), "12345679203{Enter}");

        expect(onLink).toHaveBeenCalledWith("12345679203");
        expect(onSubmit).not.toHaveBeenCalled();
    });

    it("shows the backend's error message", () => {
        renderPanel({ errorMessage: "Order does not belong to this event" });

        expect(screen.getByText("Order does not belong to this event")).toBeInTheDocument();
    });

    it("disables the button while linking", () => {
        renderPanel({ pending: true });

        expect(screen.getByRole("button", { name: /Linking/ })).toBeDisabled();
    });

    it("lists every hint and adds the refund note for multiple orders", () => {
        renderPanel({ orders: TWO_ORDERS });

        expect(screen.getByText(/Order ending 1234/)).toBeInTheDocument();
        expect(screen.getByText(/Order ending 5678/)).toBeInTheDocument();
        expect(screen.getByText(/more than one order/)).toBeInTheDocument();
        expect(screen.getByText(/contact FACT IT about a refund/)).toBeInTheDocument();
    });

    it("reveals the checkout from the not-my-ticket link", async () => {
        const props = renderPanel();

        await userEvent.click(screen.getByRole("button", { name: /That's not my ticket, show checkout/ }));

        expect(props.onShowCheckout).toHaveBeenCalledTimes(1);
        expect(props.onLink).not.toHaveBeenCalled();
    });

    it("never shows more than the hint (only hints are passed in)", () => {
        renderPanel({ orders: TWO_ORDERS });

        const text = document.body.textContent ?? "";
        expect(text).not.toMatch(/\d{5,}/);
    });
});

describe("DifferentEmailOrderLink", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("starts collapsed and expands to the same order-number form", async () => {
        const onLink = jest.fn();
        render(<DifferentEmailOrderLink onLink={onLink} pending={false} errorMessage={null} />);

        expect(screen.queryByLabelText(/order number/i)).not.toBeInTheDocument();

        await userEvent.click(
            screen.getByRole("button", { name: /Already bought a ticket with a different email\? Enter your order number/ })
        );
        await userEvent.type(screen.getByLabelText(/order number/i), " 555 ");
        await userEvent.click(screen.getByRole("button", { name: "Link my ticket" }));

        expect(onLink).toHaveBeenCalledWith("555");
    });

    it("shows the backend's error message once expanded", async () => {
        render(<DifferentEmailOrderLink onLink={() => {}} pending={false} errorMessage="Order is not complete" />);

        await userEvent.click(screen.getByRole("button", { name: /different email/ }));

        expect(screen.getByText("Order is not complete")).toBeInTheDocument();
    });
});
