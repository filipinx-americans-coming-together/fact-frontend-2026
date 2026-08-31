import LoadingCircle from "../icons/LoadingCircle";
import { useWorkshop } from "@/hooks/api/useWorkshop";

interface AgendaWorkshop {
    id: number;
    startTime: string;
    endTime: string;
}

/**
 * Workshop information for dashboard agenda
 * @param id id of workshop
 * @returns AgendaWorkshop component
 */
export default function AgendaWorkshop(props: AgendaWorkshop) {
    const { workshop } = useWorkshop({ id: props.id });

    return (
        <>
            {workshop ? (
                <div>
                    <div className="font-bold">
                        Session {workshop.workshop.session}:{" "}
                        {workshop.workshop.title}
                    </div>
                    <div>
                        {props.startTime} - {props.endTime}
                    </div>
                    <div>
                        {workshop.location.building}{" "}
                        {workshop.location.room_num}
                    </div>
                </div>
            ) : (
                <LoadingCircle />
            )}
        </>
    );
}
