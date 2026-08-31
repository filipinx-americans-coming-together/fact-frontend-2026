import Link from "next/link";

export default function MobileNav(props: {
    links: { text: string; path: string }[];
}) {
    return (
        <ul className="absolute z-20 right-0 rounded-sm py-2 mt-2 text-left flex flex-col min-w-48 bg-white saturate-50">
            {props.links.map((link, index) => (
                <Link
                    className="px-6 py-2 hover:bg-gray-100"
                    key={index}
                    href={link.path}
                >
                    {link.text}
                </Link>
            ))}
        </ul>
    );
}
