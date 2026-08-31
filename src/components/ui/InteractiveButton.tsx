interface InteractiveButtonProps {
    text: string;
    onClick: Function;
    isSubmit?: boolean;
    disabled?: boolean;
}

/**
 * Interactive button
 * @param text text to display
 * @param onClick function to call on click
 * @returns InteractiveButton component
 */
export default function InteractiveButton({
    text,
    onClick,
    isSubmit = false,
    disabled = false,
}: InteractiveButtonProps) {
    return (
        <button
            className={`bg-highlight-2-secondary px-8 py-2 rounded-xs ${disabled ? "" : "hover:bg-highlight-third"}`}
            type={isSubmit ? "submit" : "button"}
            id={isSubmit ? "main-submit" : ""}
            onClick={(event) => {
                if (!isSubmit) event.preventDefault();
                onClick();
                // [#FF6381]
            }}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
