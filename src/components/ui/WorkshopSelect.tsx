import { LocationData, RegistrationData, WorkshopData } from "@/util/types";
import { useWorkshops } from "@/hooks/api/useWorkshops";
import SearchableSelect from "./SearchableSelect";
import LoadingCircle from "../icons/LoadingCircle";
import { useLocations } from "@/hooks/api/useLocations";

interface WorkshopSelectProps {
    id: string;
    session: number;
    userRegistration?: RegistrationData[];
    setState: (state: Object) => void;
    defaultValue?: string;
    required?: boolean;
    labels?: boolean;
    disabled?: boolean;
}

const session_labels = [ "Awareness Workshops", "Personal Growth Workshops", "Professional Skill Workshops" ];

/**
 * Workshop selection menu
 * @param id html id for select
 * @param session session number
 * @param setState function to call on input change
 * @param defaultValue id of workshop to select by default
 * @returns WorkshopSelect component
 */
function WorkshopSelect({
    id,
    session,
    userRegistration,
    setState,
    defaultValue,
    required = true,
    labels = true,
    disabled = false,
}: WorkshopSelectProps) {
    const { workshops, isLoading, error } = useWorkshops();
    const { locations, isLoading: isLoadingLocs, error: errorLocs } = useLocations();

    return (
        (isLoading || isLoadingLocs) ? (session===2 && <LoadingCircle/>) : 
        workshops &&
        workshops.length > 0 && (
            <SearchableSelect
                id={id}
                label={`Session ${session}${labels ? ": " + session_labels[session-1] : ""}`}
                placeholder="Search for workshops..."
                setState={setState}
                defaultValue={
                    defaultValue
                    ? defaultValue
                    // : workshops
                    //       .filter(
                    //           (workshop: WorkshopData) =>
                    //               workshop.session == session
                    //       )[0]
                    //       .id.toString()
                    : undefined
                }
                required={required}
                disabled={disabled}
                options={workshops
                    .filter(
                        (workshop: WorkshopData) => workshop.session == session
                    )
                    .map((workshop) => {
                        const loc = locations?.filter((location: LocationData) => location.id == workshop.location)[0]
                        // console.log(workshop.title, userRegistration?.length && userRegistration[session-1].workshop !== workshop.id )
                        return {
                            label: `${workshop.title} ${loc?.capacity ? (workshop.registrationCount >= 0.9*loc.capacity ? (workshop.registrationCount >= loc.capacity ? "(Full)" : "(Low Seats)"): "") : ""}`,
                            value: workshop.id.toString(),
                            disabled: loc?.capacity ? (workshop.registrationCount >= loc.capacity && (userRegistration?.length ? userRegistration[session-1].workshop !== workshop.id : true)) : false
                        };
                    })}
            />
        )
    );
}

export default WorkshopSelect;
