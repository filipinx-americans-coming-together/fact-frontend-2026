import { useAgendaItems } from "@/hooks/api/useAgendaItems";
import { useWorkshop } from "@/hooks/api/useWorkshop";
import { useMemo } from "react";

export default function WorkshopInfo({ workshopID }: { workshopID: number }) {
    const { workshop } = useWorkshop({ id: workshopID });
    const { agendaItems } = useAgendaItems();

    const workshopTime: { startTime: string; endTime: string } | undefined =
        useMemo(() => {
            if (!workshop || !agendaItems) {
                return undefined;
            }

            const session = workshop.workshop.session;

            const agendaItem = agendaItems.find(
                (item) => item.session_num === session
            );

            if (!agendaItem) {
                return undefined;
            }

            const timeOptions: Intl.DateTimeFormatOptions = {
                timeZone: "America/Chicago",
                hour: "2-digit",
                minute: "2-digit",
            };
            
            return {
                startTime: agendaItem.start_time.toLocaleTimeString(
                    "en-US",
                    timeOptions
                ),
                endTime: agendaItem.end_time.toLocaleTimeString(
                    "en-US",
                    timeOptions
                ),
            };
        }, [workshop, agendaItems]);

    if (!workshop) {
        return <></>;
    }

    return (
        <div className="">
            <h2 className="text-lg font-bold flex justify-between gap-4">
                Session {workshop.workshop.session}
                <span className="text-slate-700 font-semibold">
                    {workshopTime
                        ? `${workshopTime?.startTime} - ${workshopTime?.endTime}`
                        : "TBD"}
                </span>
            </h2>
            <p>{workshop.workshop.title}</p>
            <p>
                Location: {workshop.location.building}{" "}
                {workshop.location.room_num}
            </p>
            <p>Registered Delegates: {workshop.workshop.registrationCount}</p>
            <br />
            <div className="hidden">
                <h2>Facilitator Assistant(s)</h2>
                <ul>
                    {workshop.facilitator_assistants?.map((fa) => (
                        <li key={fa.name}>
                            - {fa.name}, {fa.contact}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
