import Link from "next/link";

interface LinkButtonProps {
    text: string;
    url: string;
    newTab?: boolean;
}

/**
 * Link button
 * @param text text to display
 * @param url url to direct to
 * @returns LinkButton
 */
export default function LinkButton({
    text,
    url,
    newTab = false,
}: LinkButtonProps) {
    return (
        <Link href={url} target={newTab ? "_blank" : "_self"} className="mx-auto my:4">
            <button className="text-center text-text-primary border-2 w-fit p-4 hover:text-background-primary hover:bg-highlight-2-primary hover:border-transparent">
                {text}
            </button>
        </Link>
    );
}
