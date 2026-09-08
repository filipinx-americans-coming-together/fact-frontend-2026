import Link from "next/link";
import Button from "./Button";
import { useLogout } from "@/hooks/api/useLogout";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useRouter } from "next/navigation";

const LINKS: { label: string; url: string }[] = [
    { label: "Dashboard", url: "/admin/dashboard" },
    { label: "Workshops", url: "/admin/workshops" },
    { label: "Locations", url: "/admin/locations" },
    { label: "Schools", url: "/admin/schools" },
    { label: "Agenda", url: "/admin/agenda" },
    { label: "Facilitator Accounts", url: "/admin/facilitator-accounts"},
    { label: "Day-Of Registration", url: "/admin/day-of"},
    { label: "Promote Admin", url: "/admin/accounts"},
];

export default function Navbar() {
    const { logout, isSuccess, isPending } = useLogout();
    const router = useRouter();

    return (
        <div
            className="w-full text-sm flex flex-wrap justify-evenly items-center gap-3 p-4"
            style={{
                background: "linear-gradient(180deg, var(--violet-800) 0%, var(--ink-900) 100%)",
                color: "var(--cream-100)",
                fontFamily: "var(--font-ui)",
                borderBottom: "1px solid rgba(255,255,255,0.18)",
            }}
        >
            {LINKS.map((link) => (
                <Link
                    key={link.label}
                    href={link.url}
                    className="hover:text-[var(--orchid-400)]"
                >
                    {link.label}
                </Link>
            ))}

            {isPending ? (
                <LoadingCircle />
            ) : (
                <Button
                    text="Log out"
                    onClick={() => {
                        logout();
                        router.push("/");
                    }}
                    isSubmit={false}
                />
            )}
        </div>
    );
}
