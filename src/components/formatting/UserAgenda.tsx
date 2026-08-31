import jsPDF from "jspdf";
import LoadingCircle from "../icons/LoadingCircle";
import AgendaWorkshop from "./AgendaWorkshop";
import { useUser } from "@/hooks/api/useUser";
import { useWorkshops } from "@/hooks/api/useWorkshops";
import { useLocations } from "@/hooks/api/useLocations";
import { useAgendaItems } from "@/hooks/api/useAgendaItems";
import { AgendaItemData, LocationData, WorkshopData } from "@/util/types";
import { useMemo } from "react";

interface FormattedData extends AgendaItemData {
    day: string;
}

const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "America/Chicago",
};

const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Chicago",
};

const SATURDAY = "Saturday, November 15";
const FRIDAY = "Friday, November 14";
const SUNDAY = "Sunday, November 16";

/**
 * Agenda for individual user
 * @param id id of user
 * @returns UserAgenda component
 */
function UserAgenda() {
    const { user } = useUser();
    const { workshops } = useWorkshops();
    const { locations } = useLocations();
    const { agendaItems } = useAgendaItems();

    const formattedData: FormattedData[] = useMemo(() => {
        if (!agendaItems) {
            return [];
        }

        return agendaItems.map((item) => {
            const newItem = item as FormattedData;
            newItem.day = item.start_time.toLocaleDateString(
                "en-US",
                DATE_OPTIONS
            );

            return newItem;
        });
    }, [agendaItems]);

    const userWorkshops: Map<
        number,
        { workshop: WorkshopData; location: LocationData }
    > = useMemo(() => {
        if (!user || !workshops) {
            return new Map();
        }

        const result = new Map();

        user.registration?.forEach((workshop) => {
            const workshopData = workshops.find(
                (otherWorkshop) => otherWorkshop.id === workshop.workshop
            );

            if (workshopData) {
                const locationData = locations?.find(
                    (location) => location.id === workshopData.location
                );

                if (locationData) {
                    result.set(workshopData.session, {
                        workshop: workshopData,
                        location: locationData,
                    });
                }
            }
        });

        return result;
    }, [user, workshops, locations]);

    function downloadAgendaPDF(
        name: string,
        data: FormattedData[],
        workshops: Map<
            number,
            { workshop: WorkshopData; location: LocationData }
        >
    ) {
        const pdf = new jsPDF("p", "mm", "a4", true);

        const textLines = [`${name}'s FACT 2025 Agenda`, ""];

        [FRIDAY, SATURDAY, SUNDAY].forEach((day) => {
            textLines.push(day);

            const events = data.filter((item) => item.day === day);

            for (let i = 0; i < events.length; i++) {
                const sessionNum = events[i].session_num;
                if (sessionNum) {
                    // workshop
                    const workshopData = workshops.get(sessionNum);

                    if (workshopData) {
                        textLines.push(
                            `    ${events[i].title} - ${workshopData.workshop.title}`
                        );

                        textLines.push(
                            `       ${events[i].start_time.toLocaleString(
                                "en-US",
                                TIME_OPTIONS
                            )} - ${events[i].end_time.toLocaleString(
                                "en-US",
                                TIME_OPTIONS
                            )}`
                        );

                        const building = workshopData.location.building;
                        const roomNum = workshopData.location.room_num;

                        if (building === "nan" && roomNum === "nan") {
                            textLines.push(`        Location TBD`);
                        } else {
                            textLines.push(
                                `       ${building !== "nan" ? building : ""} ${
                                    roomNum !== "nan" ? roomNum : ""
                                }`
                            );
                        }
                    }
                } else {
                    // not workshop
                    textLines.push(`    ${events[i].title}`);
                    textLines.push(
                        `       ${events[i].start_time.toLocaleString(
                            "en-US",
                            TIME_OPTIONS
                        )} - ${events[i].end_time.toLocaleString(
                            "en-US",
                            TIME_OPTIONS
                        )}`
                    );

                    const building = events[i].building;
                    const roomNum = events[i].room_num;

                    if (building === "nan" && roomNum === "nan") {
                        textLines.push(`        Locations Vary`);
                    } else {
                        textLines.push(
                            `       ${building !== "nan" ? building : ""} ${
                                roomNum !== "nan" ? roomNum : ""
                            }`
                        );
                    }
                }

                textLines.push("");
            }
        });

        pdf.text(textLines, 10, 16);
        pdf.save("my-fact-agenda.pdf");
    }

    return (
        <>
            {user ? (
                <div className="flex flex-col">
                    <div className="text-center">
                        <div className="text-3xl font-bold">My Agenda</div>
                        <br />
                        <button
                            className="underline font-light hover:text-highlight-2-primary my-3"
                            onClick={() => {
                                downloadAgendaPDF(
                                    user.user.first_name,
                                    formattedData,
                                    userWorkshops
                                );
                            }}
                        >
                            Download
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-10 text-left">
                        {[FRIDAY, SATURDAY, SUNDAY].map((day) => {
                            return (
                                <div
                                    key={day}
                                    className="flex flex-col gap-4 border-highlight-2-secondary md:border-l-2 md:pl-4"
                                >
                                    <div className="font-bold text-xl my-2">
                                        {day}
                                    </div>
                                    {formattedData
                                        .filter((item) => item.day === day)
                                        .map((item) => {
                                            if (item.session_num) {
                                                const workshop =
                                                    userWorkshops.get(
                                                        item.session_num
                                                    );

                                                if (!workshop) {
                                                    return <></>;
                                                }

                                                return (
                                                    <AgendaWorkshop
                                                        key={item.id}
                                                        id={
                                                            workshop.workshop.id
                                                        }
                                                        startTime={item.start_time.toLocaleString(
                                                            "en-US",
                                                            TIME_OPTIONS
                                                        )}
                                                        endTime={item.end_time.toLocaleString(
                                                            "en-US",
                                                            TIME_OPTIONS
                                                        )}
                                                    />
                                                );
                                            }

                                            return (
                                                <div key={item.id}>
                                                    <div className="font-bold">
                                                        {item.title}
                                                    </div>
                                                    <div>
                                                        {item.start_time.toLocaleString(
                                                            "en-US",
                                                            TIME_OPTIONS
                                                        )}{" "}
                                                        -{" "}
                                                        {item.end_time.toLocaleString(
                                                            "en-US",
                                                            TIME_OPTIONS
                                                        )}
                                                    </div>
                                                    <div>
                                                        {item.building ===
                                                            "nan" &&
                                                            item.room_num ===
                                                                "nan" &&
                                                            "Locations Vary"}
                                                        {item.building !== "nan"
                                                            ? item.building
                                                            : ""}{" "}
                                                        {item.room_num !== "nan"
                                                            ? item.room_num
                                                            : ""}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <LoadingCircle />
            )}
        </>
    );
}

export default UserAgenda;
