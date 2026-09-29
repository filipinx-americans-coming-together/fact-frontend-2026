const STEPS = [
    { title: "Create Account", detail: null },
    { title: "Register", detail: "Pick workshops & buy your ticket" },
    { title: "You're In!", detail: "See your schedule on the dashboard" },
];

/**
 * The three-step "how registration works" stepper shown on Create Account,
 * Register and the Dashboard, with the delegate's current step highlighted
 * and earlier steps checked off. Details are hidden on phones so the row
 * stays on one line.
 */
export default function FlowSteps({ current }: { current: 1 | 2 | 3 }) {
    return (
        <ol className="grid grid-cols-3 w-full" aria-label="Registration steps">
            {STEPS.map((step, i) => {
                const n = i + 1;
                const done = n < current;
                const isCurrent = n === current;
                return (
                    <li
                        key={step.title}
                        aria-current={isCurrent ? "step" : undefined}
                        className="relative flex flex-col items-center text-center px-1"
                    >
                        {i > 0 && (
                            <span
                                aria-hidden="true"
                                className={`absolute top-4 right-1/2 w-full h-0.5 ${
                                    n <= current
                                        ? "bg-[var(--violet-800)]"
                                        : "bg-[var(--hairline-on-light)]"
                                }`}
                            />
                        )}
                        <span
                            aria-hidden="true"
                            className={`relative z-10 grid place-items-center w-8 h-8 rounded-full text-sm font-semibold ${
                                done
                                    ? "bg-[var(--violet-800)] text-[var(--cream-100)]"
                                    : isCurrent
                                      ? "bg-[linear-gradient(180deg,var(--violet-800),var(--ink-900))] text-[var(--cream-100)] ring-4 ring-[rgba(75,28,113,0.15)]"
                                      : "bg-[var(--white)] text-[var(--ink-on-light-dim)] border border-[var(--hairline-on-light)]"
                            }`}
                        >
                            {done ? "✓" : n}
                        </span>
                        <span
                            className={`mt-2 text-sm font-semibold ${
                                isCurrent
                                    ? "text-[var(--ink-900)]"
                                    : done
                                      ? "text-[var(--accent-on-light)]"
                                      : "text-[var(--ink-on-light-dim)]"
                            }`}
                        >
                            <span className="sr-only">Step {n}: </span>
                            {step.title}
                            {done && <span className="sr-only"> (done)</span>}
                        </span>
                        {step.detail && (
                            <span
                                className={`hidden sm:block mt-0.5 text-xs leading-snug text-[var(--ink-on-light-dim)] ${
                                    isCurrent ? "" : "opacity-70"
                                }`}
                            >
                                {step.detail}
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}
