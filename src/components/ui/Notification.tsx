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
        <div className="animate-drop-down absolute z-50 w-full top-2">
            <div className="w-11/12 md:w-9/12 py-4 px-8 flex justify-between items-center gap-4 bg-blue-200 rounded-sm text-background-primary shadow-sm mx-auto">
                <div className="w-fit text-xl text-blue-600">
                    <MdInfoOutline />
                </div>

                {text}
                <button
                    type="button"
                    className="w-fit text-xl hover:text-slate-600"
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
