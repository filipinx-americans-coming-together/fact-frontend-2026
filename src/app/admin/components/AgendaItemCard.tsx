function addLeadingZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
}

export default function AgendaItemCard({
    title,
    building,
    roomNum,
    start,
    end,
}: {
    title: string;
    building: string;
    roomNum: string;
    start: string;
    end: string;
}) {
    return (
        <div className="w-full flex flex-col md:flex-row gap-8 bg-slate-50 px-6 py-4 rounded-sm shadow-sm justify-between">
            <div className="text-left">
                <div className="font-semibold">{title}</div>
                <div>
                    {building !== "nan" && building}{" "}
                    {roomNum !== "nan" && roomNum}
                </div>
            </div>
            <div className="text-right">
                <div>
                    Start: {addLeadingZero(new Date(start).getHours())}:
                    {addLeadingZero(new Date(start).getMinutes())} CST
                </div>
                <div>
                    End: {addLeadingZero(new Date(end).getHours())}:
                    {addLeadingZero(new Date(end).getMinutes())} CST
                </div>
            </div>
        </div>
    );
}
