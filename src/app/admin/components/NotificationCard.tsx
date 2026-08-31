export default function NotificationCard({
    text,
    expiration,
}: {
    text: String;
    expiration: String;
}) {
    return (
        <div className="relative bg-slate-50 px-6 py-4 rounded-sm shadow-sm grid grid-cols-1 divide-y-2 gap-2 md:gap-0 md:divide-y-0 md:grid-cols-3">
            <p className="md:col-span-2">{text}</p>
            <p>Expires {expiration}</p>
        </div>
    );
}
