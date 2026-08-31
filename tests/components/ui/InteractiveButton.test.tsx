import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import jest from "jest-mock";

import InteractiveButton from "../../../src/components/ui/InteractiveButton";

describe("InteractiveButton", () => {
    // clear dom after each test
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("should render text prop", () => {
        render(<InteractiveButton text="test text" onClick={() => {}} />);

        expect(screen.getByRole("button")).toHaveTextContent("test text");
    });

    it("should call onClick prop when clicked", async () => {
        const mockOnClick = jest.fn();
        render(<InteractiveButton text="" onClick={mockOnClick} />);

        // click
        const button = screen.getByRole("button");
        await userEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledOnce();
    });
});
