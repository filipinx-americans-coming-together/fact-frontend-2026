"use client";

import TextInput from "@/components/ui/TextInput";
import FormContainer from "../components/FormContainer";
import DateTimeInput from "../components/DateTimeInput";
import AgendaList from "../components/AgendaList";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import { useAgendaItems } from "../../../hooks/api/useAgendaItems";
import { useState } from "react";
import Select from "@/components/ui/Select";
import { useCreateAgendaItem } from "../hooks/useCreateAgendaItem";
import UploadFile from "../components/UploadFile";
import { useUploadAgendaItems } from "../hooks/useUploadAgendaItems";
import Navbar from "../components/Navbar";

export default function Agenda() {
    const { user, isLoading } = useAdminUser();
    const { agendaItems } = useAgendaItems();
    const {
        createAgendaItem,
        isPending: createPending,
        error: createError,
    } = useCreateAgendaItem();
    const {
        uploadAgendaItems,
        isPending: uploadPending,
        error: uploadError,
    } = useUploadAgendaItems();

    const [formData, setFormData] = useState<Object>({
        title: "",
        building: "",
        room_num: "",
        start_time: "",
        end_time: "",
        session_num: "",
    });

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
            <div className="min-h-screen bg-slate-50 text-black">
                <div className="w-9/12 mx-auto text-center">
                    <h1 className="py-6 text-xl">Agenda</h1>

                    <br />
                    {(!agendaItems || agendaItems.length === 0) && (
                        <>
                            <UploadFile
                                title="Agenda"
                                onUpload={uploadAgendaItems}
                                errorMessage={uploadError?.message}
                                isLoading={uploadPending}
                            />
                            <br />
                            <br />
                        </>
                    )}

                    <div className="mx-auto rounded-sm bg-gray-300 p-6 w-fit">
                        {/* TODO: make session not required for adding agenda item */}
                        <div className="hidden">
                        <FormContainer
                            formName="newAgendaItem"
                            submitText="Add"
                            onSubmit={() => {
                                const data = formData as {
                                    title: string;
                                    start_time: string;
                                    end_time: string;
                                    building: string | undefined;
                                    room_num: string | undefined;
                                    session_num: number | undefined;
                                };

                                createAgendaItem({
                                    title: data.title,
                                    start_time: new Date(data.start_time),
                                    end_time: new Date(data.end_time),
                                    building: data.building,
                                    room_num: data.room_num,
                                    session_num: data.session_num,
                                });
                            }}
                            errorMessage={createError?.message}
                            isLoading={createPending}
                        >
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <TextInput
                                    label="Title"
                                    id="title"
                                    setState={setFormData}
                                />
                                <Select
                                    label="Session"
                                    id="session"
                                    setState={setFormData}
                                >
                                    <option value="">N/A</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Select>
                                <TextInput
                                    label="Building"
                                    id="building"
                                    setState={setFormData}
                                    required={false}
                                />
                                <TextInput
                                    label="Room Number"
                                    id="room_num"
                                    setState={setFormData}
                                    required={false}
                                />
                                <DateTimeInput
                                    label="Start Time"
                                    id="start_time"
                                    setState={setFormData}
                                />
                                <DateTimeInput
                                    label="End Time"
                                    id="end_time"
                                    setState={setFormData}
                                />
                            </div>
                        </FormContainer>
                        </div>
                        <br />
                        {/* TODO hard-coded conference dates rn */}
                        <h1 className="text-left">Friday, November 14</h1>
                        <br />
                        <AgendaList
                            displayItems={
                                agendaItems
                                    ? agendaItems.filter((item) => {
                                          const asDate = item.start_time;
                                          return asDate.getDay() === 5;
                                      })
                                    : []
                            }
                        />

                        <br />
                        <br />
                        <h1 className="text-left">Saturday, November 15</h1>
                        <br />
                        <AgendaList
                            displayItems={
                                agendaItems
                                    ? agendaItems.filter((item) => {
                                          const asDate = item.start_time;
                                          return asDate.getDay() === 6;
                                      })
                                    : []
                            }
                        />
                        <br />
                        <br />
                        <h1 className="text-left">Sunday, November 16</h1>
                        <br />
                        <AgendaList
                            displayItems={
                                agendaItems
                                    ? agendaItems.filter((item) => {
                                          const asDate = item.start_time;
                                          return asDate.getDay() === 7;
                                      })
                                    : []
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
