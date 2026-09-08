import { EventHandler } from "react";

export default function Button({
    text,
    onClick,
    isSubmit = false,
}: {
    text: String;
    onClick: EventHandler<any>;
    isSubmit: boolean;
}) {
    return (
        <button
            className="pill pill--ink"
            type={isSubmit ? "submit" : "button"}
            onClick={(event) => {
                onClick(event);
            }}
        >
            {text}
        </button>
    );
}
