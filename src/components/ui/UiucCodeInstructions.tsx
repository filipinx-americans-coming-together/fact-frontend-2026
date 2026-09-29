interface UiucCodeInstructionsProps {
    // "standard": shown under both ticket buttons. "performer": performers
    // only get the Workshops Only checkout, which has nothing pre-filled.
    variant: "standard" | "performer";
}

/**
 * How to apply a UIUC discount code in the Eventbrite checkout below it.
 * The same UIUC code works for Workshops Only and Bundle tickets; only the
 * Variety Show Only code differs (it ends in -VSHOW).
 */
export default function UiucCodeInstructions({ variant }: UiucCodeInstructionsProps) {
    return (
        <div className="w-full max-w-md mx-auto flex flex-col gap-2 text-sm text-left p-4 rounded-lg" style={{ border: "1px solid var(--hairline-on-light)" }}>
            <p className="font-bold text-center">Using a UIUC discount code?</p>
            {variant === "standard" ? (
                <>
                    <ol className="list-decimal pl-5 flex flex-col gap-1">
                        <li>In the checkout below, click <b>&quot;Remove&quot;</b> next to the code that&apos;s already filled in.</li>
                        <li>Enter your UIUC discount code, not the one ending in -VSHOW.</li>
                        <li>Before proceeding, check that your ticket name ends in <b>UIUC</b>.</li>
                    </ol>
                    <p className="text-[var(--ink-on-light-dim)]">
                        Variety Show Only tickets don&apos;t include workshops and can&apos;t be used to register here. No discount code? Leave the checkout as is.
                    </p>
                </>
            ) : (
                <>
                    <ol className="list-decimal pl-5 flex flex-col gap-1">
                        <li>Enter your UIUC code in the checkout below. Use the regular code, not the one ending in -VSHOW.</li>
                        <li>Before proceeding, check that your ticket name ends in <b>UIUC</b>.</li>
                    </ol>
                    <p className="text-[var(--ink-on-light-dim)]">
                        As a performer you don&apos;t need a Variety Show ticket. No discount code? Leave the checkout as is.
                    </p>
                </>
            )}
        </div>
    );
}
