import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    const FACT_LOGO_LENGTH = 60;
    const FACT_LOGO_SOURCE = "/images/fact26-logomark.png";

    return (
        <div className="bg-gradient w-full">
        <footer className="pt-12 pb-6 px-4 w-full flex flex-col items-center">
            {/* Logos */}
            <div className="flex flex-row flex-wrap items-center gap-4">
                <span className="hidden sm:block grow" />
                <Image
                    src={FACT_LOGO_SOURCE}
                    width={FACT_LOGO_LENGTH}
                    height={FACT_LOGO_LENGTH}
                    alt="FACT 2026 Logo"
                    className="object-cover rounded-lg aspect-square"
                />
            </div>

            {/* Links and copyright */}
            <p className="text-center mt-4">
                <Link
                    href="https://psauiuc.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                >
                    Brought to you by the Philippine Student Association UIUC.
                </Link>
            </p>
            <p className="text-center mt-2">Copyright © 2025 PSA UIUC</p>
        </footer>
        </div>
    );
};

export default Footer;
