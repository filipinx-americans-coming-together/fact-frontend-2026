"use client";

import InteractiveButton from "@/components/ui/InteractiveButton";
import FacilitatorRow from "./FacilitatorRow";
import { useState } from "react";
import { useRegisterFacilitator } from "@/hooks/api/useRegisterFacilitator";
import LoadingCircle from "@/components/icons/LoadingCircle";
import FormContainer from "@/app/admin/components/FormContainer";
import SearchableSelect from "@/components/ui/SearchableSelect";
import WorkshopSelect from "@/components/ui/WorkshopSelect";
import { IoMdRefresh } from "react-icons/io";
// import Select from "@/components/ui/Select";

const SESSION_NUMBERS = [1, 2, 3];

export default function FacilitatorRegistration({
    facilitators,
    facilitatedSessions,
    registrations,
}: {
    facilitators: string[];
    facilitatedSessions: { session: number; title: string }[];
    registrations:
        | {
              facilitator_name: string;
              workshop: number;
              session: number;
          }[];
}) {
    // const [formData, setFormData] = useState<Object>({});
    // const { registerFacilitators, isPending, isSuccess, error } =
    //     useRegisterFacilitators();

    const [activeFacilitator, setActiveFacilitator] = useState<Object>({facilitator: facilitators[0]});

    return (
        <div>
            <h1 className="font-bold text-xl">Register for workshops</h1>
            <p className="text-xs">
                Registration for other workshops is{" "}
                <span className="font-bold">not</span> required for facilitators
            </p>
            <br />
            <div className="flex flex-col lg:flex-row gap-6">
            
            {facilitators.length > 1 ? 
            <div className="lg:w-1/4 px-6 lg:p-0">
                    <SearchableSelect
                        label="Select Facilitator"
                        placeholder="Select Facilitator"
                        id="facilitator"
                        setState={setActiveFacilitator}
                        defaultValue={"0"}
                        required={false}
                        // defaultValue={(activeFacilitator as {facilitator: number}).facilitator.toString()}
                        options={facilitators.map((name,index) => {return {label: name, value: index.toString()}})}
                    /> </div>
                    : <></>}
                    
            <FacilitatorRow
                key={(activeFacilitator as {facilitator: number}).facilitator}
                name={facilitators[(activeFacilitator as {facilitator: number}).facilitator]}
                facilitatedSessions={facilitatedSessions}
                registrations={registrations?.filter(
                    (registration) =>
                        registration.facilitator_name ===
                        facilitators[(activeFacilitator as {facilitator: number}).facilitator]
                )}
                // setState={setFormData}
            />
            </div>
            <div className="text-sm text-slate-700 text-center flex flex-col md:flex-row gap-1 items-center w-fit mx-auto mt-2 lg:mt-4">Just made a change but don&#39;t see it? Refresh the page <div className="text-lg"><IoMdRefresh /></div></div>
            {/* facilitator list */}
            {/* <div className="">
                {facilitators.map((facilitator) => {
                    return (
                        <FacilitatorRow
                            key={facilitator}
                            name={facilitator}
                            facilitatedSessions={facilitatedSessions}
                            registrations={registrations?.filter(
                                (registration) =>
                                    registration.facilitator_name ===
                                    facilitator
                            )}
                            // setState={setFormData}
                        />
                    );
                })}
                <br />
                <div className="flex justify-center">
                    {/* {error && (
                        <p className="text-red-600 text-center">{error.message}</p>
                    )}
                    {isSuccess && "Changes saved successfully"}
                    {isPending && !isSuccess && <LoadingCircle />} */}
                    {/* {!isPending && !isSuccess && (
                        <InteractiveButton
                            text="Save Changes"
                            onClick={() => {
                                // parse data, name|workshop
                                // format with name: name, workshops: [ids]

                                const registrationData: {
                                    facilitator_name: string;
                                    workshops: (number | undefined)[];
                                }[] = [];

                                for (const [key, value] of Object.entries(
                                    formData
                                )) {
                                    const data = key.split("|");
                                    const facilitatorName = data[0];

                                    const index = registrationData.findIndex(
                                        (registration) =>
                                            registration.facilitator_name ===
                                            facilitatorName
                                    );

                                    if (index !== -1) {
                                        registrationData[index].workshops.push(
                                            value ? parseInt(value) : undefined
                                        );
                                    } else {
                                        registrationData.push({
                                            facilitator_name: facilitatorName,
                                            workshops: [
                                                value
                                                    ? parseInt(value)
                                                    : undefined,
                                            ],
                                        });
                                    }
                                }

                                registerFacilitators({
                                    registrations: registrationData,
                                });
                            }}
                        />
                    )} 
                </div>
            </div> */}
        </div>
    );
}
