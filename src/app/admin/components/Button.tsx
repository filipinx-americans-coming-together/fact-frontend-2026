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
            className="bg-slate-900 text-slate-50 px-8 py-1 rounded-sm hover:bg-slate-700"
            type={isSubmit ? "submit" : "button"}
            onClick={(event) => {
                onClick(event);
            }}
        >
            {text}
        </button>
    );
}
