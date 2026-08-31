interface PageHeaderProps {
    text: string;
    maintainCase: boolean;
}

/**
 * Formatting for page header
 * @param text page title
 * @returns PageHeader
 */
export default function PageHeader({ text, maintainCase }: PageHeaderProps) {
    return (
        <div className="text-center py-4 sm:p-10 border-b-2 mb-6 lg:mb-10 bg-white opacity-50">
            <div className={`font-bold text-4xl sm:text-5xl lg:text-6xl ${maintainCase ? "" : "uppercase"}`}>
                {text}
            </div>
        </div>
    );
}
