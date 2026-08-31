import Link from "next/link";

export default function DesktopNav(props: {
    links: { text: string; path: string }[];
}) {
    return (
        <ul className="hidden items-center justify-center text-center gap-16 lg:flex">
            {props.links.map((link, index) => (
                <li
                    className={"text-text-primary " + `${link.text === "My FACT" ? " rounded-full w-fit ml-[-8px] px-4 py-2 bg-highlight-primary hover:bg-highlight-secondary whitespace-nowrap" : "hover:text-white"}`}
                    key={index}
                >
                    <Link href={link.path}>{link.text}</Link>
                </li>
            ))}
        </ul>
    );
}
