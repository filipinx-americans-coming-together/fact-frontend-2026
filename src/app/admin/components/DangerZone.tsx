import { useUpdateFlag } from "../hooks/useUpdateFlag";
import DangerZoneAction from "./DangerZoneAction";
import { useRegistrationFlag } from "@/hooks/api/useRegistrationFlag";

export default function DangerZone() {
    const { flag: registrationOpen } = useRegistrationFlag("registration");

    const { flag: workshopsChangeable } =
        useRegistrationFlag("workshop-changes");

    const { flag: matchLocations } = useRegistrationFlag("location-matching");

    const { updateFlag } = useUpdateFlag();

    const toggleableFlags = [
        // {
        //     title: "Registration",
        //     isEnabled: registrationOpen?.value,
        //     description:
        //         "When registration is enabled, delegates are able to create accounts and register for workshops. When registration is disabled, new delegates can not register for workshops, but already registered delegates can change their workshops.",
        //     toggle: () => {
        //         updateFlag({
        //             label: "registration",
        //             value: !registrationOpen?.value,
        //         });
        //     },
        // },
        {
            title: "Workshop Changes",
            isEnabled: workshopsChangeable?.value,
            description:
                "When workshop changes are enabled, registered delegates can freely change their workshops. When workshop changes are disabled, registered delegates can not change their workshops",
            toggle: () => {
                updateFlag({
                    label: "workshop-changes",
                    value: !workshopsChangeable?.value,
                });
            },
        },
        {
            title: "Automatic Workshop Locations",
            isEnabled: matchLocations?.value,
            description:
                "When matching is enabled, workshops are automatically matched to locations based on popularity at 3:00AM CST every Sunday. When matching is disabled, workshop locations will not be changed",
            toggle: () => {
                updateFlag({
                    label: "location-matching",
                    value: !matchLocations?.value,
                });
            },
        },
    ];

    return (
        <div className="border-2 rounded-sm divide-y-2 flex flex-col">
            {toggleableFlags.map((flag, idx) => {
                return (
                    <DangerZoneAction
                        key={idx}
                        title={flag.title}
                        description={flag.description}
                        permissionState={
                            flag.isEnabled ? "ENABLED" : "DISABLED"
                        }
                        actionText={
                            flag.isEnabled
                                ? `Disable ${flag.title}`
                                : `Enable ${flag.title}`
                        }
                        confirmText={
                            flag.isEnabled
                                ? `enable ${flag.title.toLowerCase()}`
                                : `disable ${flag.title.toLowerCase()}`
                        }
                        changePermission={flag.toggle}
                    />
                );
            })}
            {/* <DangerZoneAction
                title="Reset Database"
                description="By resetting the database you will remove all workshop, location, facilitator information. Only do this after FACT is over. Account information will not be removed. Resetting the database will require an access key from FACT IT."
                actionText={"Reset Database"}
                confirmText={
                    "Are you sure you want to reset the database? This action is permanent and can not be undone."
                }
                changePermission={() => {
                    let code = prompt(
                        "Enter the code provided by another admin"
                    );
                }}
            /> */}
        </div>
    );
}
