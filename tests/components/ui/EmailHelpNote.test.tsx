import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import EmailHelpNote from "../../../src/components/ui/EmailHelpNote";

describe("EmailHelpNote", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("code: where to look for a verification code", () => {
        const { container } = render(<EmailHelpNote variant="code" />);

        expect(container).toHaveTextContent(
            "Didn't get the email? It can take a few minutes. Check your Spam, Promotions and Updates folders, and search for no-reply@psauiuc.org."
        );
    });

    it("ticket: the ticket comes from Eventbrite", () => {
        const { container } = render(<EmailHelpNote variant="ticket" />);

        expect(container).toHaveTextContent(
            "Your ticket email comes from Eventbrite. Not seeing it? Check your Spam, Promotions and Updates folders."
        );
        expect(screen.queryByText(/no-reply@psauiuc.org/)).not.toBeInTheDocument();
    });
});
