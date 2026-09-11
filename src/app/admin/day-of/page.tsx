"use client";

import { useAdminUser } from "@/hooks/api/useAdminUser";
import LoadingCircle from "@/components/icons/LoadingCircle";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import Navbar from "../components/Navbar";
import FormContainer from "../components/FormContainer";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";
import SchoolSelect from "@/components/ui/SchoolSelect";
import WorkshopSelect from "@/components/ui/WorkshopSelect";
import { useState } from "react";
import {
    DayOfDelegateProps,
    useCreateDayOfDelegate,
} from "../hooks/useCreateDayOfDelegate";

export default function DayOfRegistration() {
    const { user, isLoading } = useAdminUser();
    const { createDayOfDelegate, error, isPending, isSuccess, reset } =
        useCreateDayOfDelegate();

    const [formData, setFormData] = useState<{ [key: string]: any }>({
        ticket_type: "workshop",
    });

    const includesWorkshops =
        formData.ticket_type === "workshop" || formData.ticket_type === "bundle";

    if (isLoading) {
        return (
            <div className="mx-auto w-fit p-4">
                <LoadingCircle />
            </div>
        );
    }

    if (!user) {
        return <ForbiddenPage />;
    }

    return (
        <>
            <Navbar />
            <div className="fact-form-page min-h-screen">
                <div className="w-9/12 mx-auto py-6">
                    <h1 className="text-xl">Day-Of Registration</h1>
                    <p className="text-sm text-slate-600 max-w-2xl">
                        For creating a delegate account in person, at the door.
                        This trusts your own visual confirmation of a purchased
                        ticket. It does not look anything up on Eventbrite.
                        Only use this after confirming the ticket yourself.
                    </p>
                    <br />

                    {isSuccess ? (
                        <div className="flex flex-col gap-3">
                            <p className="text-green-700 font-semibold">
                                Delegate account created and marked paid.
                            </p>
                            <button
                                className="w-fit underline text-sm"
                                onClick={() => {
                                    setFormData({ ticket_type: "workshop" });
                                    reset();
                                }}
                            >
                                Register another delegate
                            </button>
                        </div>
                    ) : (
                        <FormContainer
                            formName="dayOfRegistration"
                            submitText="Create Delegate"
                            isLoading={isPending}
                            errorMessage={error?.message}
                            onSubmit={() => {
                                createDayOfDelegate(
                                    formData as DayOfDelegateProps
                                );
                            }}
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <TextInput
                                    label="First Name"
                                    id="f_name"
                                    setState={setFormData}
                                    required={true}
                                />
                                <TextInput
                                    label="Last Name"
                                    id="l_name"
                                    setState={setFormData}
                                    required={true}
                                />
                                <TextInput
                                    label="Email"
                                    id="email"
                                    setState={setFormData}
                                    required={true}
                                />
                                <TextInput
                                    label="Temporary Password"
                                    id="password"
                                    showCharacters={false}
                                    setState={setFormData}
                                    required={true}
                                />
                                <TextInput
                                    label="Pronouns"
                                    id="pronouns"
                                    setState={setFormData}
                                    required={false}
                                />
                                <TextInput
                                    label="Year"
                                    id="year"
                                    setState={setFormData}
                                    required={false}
                                />
                                <SchoolSelect
                                    id="school_id"
                                    setState={setFormData}
                                    required={false}
                                />
                                <Select
                                    label="Ticket Type"
                                    id="ticket_type"
                                    setState={setFormData}
                                    required={true}
                                    defaultValue="workshop"
                                >
                                    <option value="workshop">
                                        Workshop Only
                                    </option>
                                    <option value="bundle">
                                        Variety Show + Workshop Bundle
                                    </option>
                                    <option value="variety_show">
                                        Variety Show Only
                                    </option>
                                </Select>
                            </div>

                            {includesWorkshops && (
                                <div className="flex flex-col gap-4">
                                    <div className="font-bold">
                                        Workshop Selection (optional)
                                    </div>
                                    <WorkshopSelect
                                        session={1}
                                        id="workshop_1_id"
                                        setState={setFormData}
                                        required={false}
                                    />
                                    <WorkshopSelect
                                        session={2}
                                        id="workshop_2_id"
                                        setState={setFormData}
                                        required={false}
                                    />
                                    <WorkshopSelect
                                        session={3}
                                        id="workshop_3_id"
                                        setState={setFormData}
                                        required={false}
                                    />
                                </div>
                            )}
                        </FormContainer>
                    )}
                </div>
            </div>
        </>
    );
}
