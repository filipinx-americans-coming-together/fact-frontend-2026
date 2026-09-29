import { describe, expect, it, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import FlowSteps from "../../../src/components/ui/FlowSteps";

describe("FlowSteps", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("lists the three steps in order", () => {
        render(<FlowSteps current={1} />);

        const steps = screen.getAllByRole("listitem").map((li) => li.textContent);
        expect(steps).toEqual([
            "1Step 1: Create Account",
            "2Step 2: RegisterPick workshops & buy your ticket",
            "3Step 3: You're In!See your schedule on the dashboard",
        ]);
    });

    it("checks off and labels the steps before the current one", () => {
        render(<FlowSteps current={3} />);

        const items = screen.getAllByRole("listitem");
        expect(items[0]).toHaveTextContent("Create Account (done)");
        expect(items[1]).toHaveTextContent("Register (done)");
        expect(items[2]).not.toHaveTextContent("(done)");
    });

    it.each([1, 2, 3] as const)("marks only step %i as current", (current) => {
        render(<FlowSteps current={current} />);

        const items = screen.getAllByRole("listitem");
        items.forEach((li, i) => {
            if (i + 1 === current) expect(li).toHaveAttribute("aria-current", "step");
            else expect(li).not.toHaveAttribute("aria-current");
        });
    });
});
