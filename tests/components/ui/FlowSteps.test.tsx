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
            "1. Create your account",
            "2. Register: pick your workshops and buy your ticket",
            "3. You're in: check your dashboard for your schedule",
        ]);
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
