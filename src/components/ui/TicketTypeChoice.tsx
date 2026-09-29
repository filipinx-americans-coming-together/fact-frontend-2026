/**
 * Whether the delegate is buying a Workshops Only ticket. Variety Show
 * performers already get into the show, so they're always Workshops Only;
 * their own pick is kept untouched so unticking "performer" restores it.
 */
export function isWorkshopsOnly(isPerformer: boolean, workshopsOnlySelected: boolean): boolean {
    return isPerformer || workshopsOnlySelected;
}

interface TicketTypeChoiceProps {
    isPerformer: boolean;
    workshopsOnlySelected: boolean;
    onChange: (workshopsOnly: boolean) => void;
}

const SELECTED = "pill pill--ink";
const UNSELECTED =
    "text-[var(--ink-900)] bg-[var(--white)] shadow-lg hover:shadow-xl border border-[var(--hairline-on-light)]";
const BUTTON = "text-sm text-center w-fit p-4 rounded-xl hover:scale-105 transition-colors";

/**
 * Workshops Only / Bundle toggle on the registration page. Performers see
 * only Workshops Only, with a note explaining why.
 */
export default function TicketTypeChoice({ isPerformer, workshopsOnlySelected, onChange }: TicketTypeChoiceProps) {
    const workshopsOnly = isWorkshopsOnly(isPerformer, workshopsOnlySelected);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center gap-2 lg:gap-4">
                <button
                    onClick={() => onChange(true)}
                    type="button"
                    aria-pressed={workshopsOnly}
                    className={`${BUTTON} ${workshopsOnly ? SELECTED : UNSELECTED}`}
                >
                    Workshops Only
                </button>
                {!isPerformer && (
                    <button
                        onClick={() => onChange(false)}
                        type="button"
                        aria-pressed={!workshopsOnly}
                        className={`${BUTTON} ${!workshopsOnly ? SELECTED : UNSELECTED}`}
                    >
                        Workshops + Variety Show Bundle
                    </button>
                )}
            </div>
            {isPerformer && (
                <p className="text-sm text-center text-[var(--ink-on-light-dim)]">
                    Performers don&apos;t need a Variety Show ticket. Register for workshops only.
                </p>
            )}
        </div>
    );
}
