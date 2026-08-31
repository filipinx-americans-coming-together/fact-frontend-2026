import LoadingCircle from "@/components/icons/LoadingCircle";
import InteractiveButton from "@/components/ui/InteractiveButton";
import WorkshopSelect from "@/components/ui/WorkshopSelect";
import { useRegisterFacilitator } from "@/hooks/api/useRegisterFacilitator";
import { useEffect, useState } from "react";

const SESSION_NUMBERS = [1, 2, 3];

export default function FacilitatorRow({
    name,
    facilitatedSessions,
    registrations,
}: {
    name: string;
    facilitatedSessions: { title: string; session: number }[];
    registrations: {
        facilitator_name: string;
        workshop: number;
        session: number;
    }[];
}) {
    const {registerFacilitator, isPending, isSuccess, error} = useRegisterFacilitator();
    // format facilitator registrations like delegates for workshop select
    const userRegistration: {delegate: number, workshop: number }[] = [];

    if (registrations && registrations.length) {
        for (var i = 0; i < 3; i++) {userRegistration.push({delegate: -1, workshop: -1})}
        for (const reg of registrations) {
            // console.log(reg)
            userRegistration[reg.session - 1].workshop = reg.workshop
            // console.log(userRegistration)
        }
    }

    const [formData, setFormData] = useState<Object>({});
    return (
        <div className="rounded-lg p-6 bg-[rgba(250,250,250,0.3)] shadow-xl mb-6 grow">
        <div className="grid grid-cols-1 gap-6 pb-6 lg:pb-2 lg:grid-cols-3 items-start">
            {/* <div className="font-bold">{name}</div> */}
            {SESSION_NUMBERS.map((sessionNum) => {
                const facilitatedSession = facilitatedSessions.find(
                    (session) => session.session === sessionNum
                );
                if (facilitatedSession) {
                    return (
                        <div
                            key={sessionNum}
                            className="text-left text-slate-600"
                        >
                            <div>Session {sessionNum}</div>
                            <div key={sessionNum}>
                                {facilitatedSession.title}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={sessionNum}>
                            <WorkshopSelect
                                session={sessionNum}
                                id={`${sessionNum.toString()}`}
                                setState={setFormData}
                                defaultValue={
                                    userRegistration.length && userRegistration[sessionNum - 1].workshop > 0
                                        ? userRegistration[sessionNum - 1].workshop.toString()
                                        : undefined
                                }
                                required={false}
                                labels={false}
                                disabled={name === undefined}
                                userRegistration={userRegistration}
                            />
                        </div>
                    );
                }
            })}
            
        </div>
        <div className="w-full flex flex-col items-center mt-4">
            {error && (
                        <div className="text-red-600 text-center">{error.message}</div>
                    )}
                    {isSuccess && "Changes saved successfully"}
                    {isPending && !isSuccess && <LoadingCircle />}
                    {!isPending && !isSuccess && (
                <div>
                    <br/>        
                <InteractiveButton 
                    text="Save Changes" 
                    disabled={name === undefined}
                    isSubmit={true}
                    onClick={() => {
                        const props = {
                        facilitator_name: name, workshops: Object.values(formData)
                    };
                    // console.log(props);
                    registerFacilitator(
                        props
                    )}}
                />
                </div>)}
            </div>
        </div>
    );
}
