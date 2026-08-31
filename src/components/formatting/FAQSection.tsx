import { ReactNode } from "react";

interface FAQProps {
    question: string;
    children: ReactNode
}

export default function FAQSection({question, children}: FAQProps) {
    return (
        <div className="mb-10">
            <div className="text-xl lg:text-2xl font-bold mb-6">{question}</div>
            <div className="">{children}</div>
        </div>
    )
}