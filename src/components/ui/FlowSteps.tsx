const STEPS = [
    { title: "Create your account", detail: null },
    { title: "Register", detail: "pick your workshops and buy your ticket" },
    { title: "You're in", detail: "check your dashboard for your schedule" },
];

/**
 * The three-step "how registration works" strip shown on Create Account,
 * Register and the Dashboard, with the delegate's current step highlighted.
 */
export default function FlowSteps({ current }: { current: 1 | 2 | 3 }) {
    return (
        <ol className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 text-sm text-center w-full">
            {STEPS.map((step, i) => {
                const n = i + 1;
                const isCurrent = n === current;
                return (
                    <li
                        key={step.title}
                        aria-current={isCurrent ? "step" : undefined}
                        className={`px-3 py-2 rounded-xl ${
                            isCurrent
                                ? "pill pill--ink"
                                : "text-[var(--ink-on-light-dim)] border border-[var(--hairline-on-light)]"
                        }`}
                    >
                        <b>
                            {n}. {step.title}
                        </b>
                        {step.detail ? `: ${step.detail}` : ""}
                    </li>
                );
            })}
        </ol>
    );
}
