"use client";

import { FaXmark } from "react-icons/fa6";
import { MdInfoOutline } from "react-icons/md";

export default function Notification({
    text,
    setClose,
}: {
    text: string;
    setClose(): void;
}) {
    return (
        <div className="animate-drop-down absolute z-50 w-full top-2 px-4">
            <div
                className="w-11/12 md:w-9/12 py-3 px-6 flex justify-between items-center gap-4 mx-auto"
                style={{
                    background: "linear-gradient(180deg, var(--violet-800) 0%, var(--ink-900) 100%)",
                    color: "var(--cream-100)",
                    fontFamily: "var(--font-ui)",
                    borderRadius: "10px",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 16px rgba(14,21,94,0.35)",
                }}
            >
                <div className="w-fit text-xl shrink-0" style={{ color: "var(--orchid-400)" }}>
                    <MdInfoOutline />
                </div>

                <p className="text-center flex-1">{text}</p>

                <button
                    type="button"
                    className="w-fit text-xl shrink-0 hover:opacity-70"
                    onClick={(event) => {
                        event.preventDefault();
                        setClose();
                    }}
                >
                    <FaXmark />
                </button>
            </div>
        </div>
    );
}
