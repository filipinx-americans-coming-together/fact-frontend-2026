"use client";

import { FaTrashCan } from "react-icons/fa6";
import FormContainer from "./FormContainer";
import TextInput from "@/components/ui/TextInput";
import DateTimeInput from "./DateTimeInput";
import NotificationCard from "./NotificationCard";
import { useNotifications } from "@/hooks/api/useNotifications";
import { useState } from "react";
import { useCreateNotification } from "../hooks/useCreateNotifications";
import { useDeleteNotification } from "../hooks/useDeleteNotification";

export default function NotificationManager() {
    const { notifications } = useNotifications();
    const {
        createNotification,
        isPending: createPending,
        error,
        isSuccess,
    } = useCreateNotification();
    const { deleteNotification, isPending: deletePending } =
        useDeleteNotification();

    const [formData, setFormData] = useState<Object>({
        message: "",
        expiration: "",
    });

    return (
        <div className="rounded bg-gray-300 p-6 w-fit">
            <FormContainer
                formName="notifications"
                onSubmit={() => {
                    createNotification({
                        message: (
                            formData as { message: string; expiration: string }
                        ).message,
                        expiration: new Date(
                            (
                                formData as {
                                    message: string;
                                    expiration: string;
                                }
                            ).expiration
                        ),
                    });
                }}
                submitText="Save"
                isLoading={createPending}
                errorMessage={error?.message}
            >
                <div className="flex flex-col gap-2 justify-between md:flex-row">
                    <TextInput
                        label="Message"
                        id="message"
                        setState={setFormData}
                        maxLength={180}
                        showCharacters
                    />
                    <DateTimeInput
                        label="Expiration"
                        id="expiration"
                        setState={setFormData}
                    />
                </div>
            </FormContainer>
            <br />

            <h2>Active Notifications</h2>
            <br />
            <div className="flex flex-col gap-4">
                {notifications &&
                    notifications.map((notification, idx) => {
                        return (
                            <div key={idx} className="flex gap-4">
                                <NotificationCard
                                    text={notification.message}
                                    expiration={notification.expiration.toLocaleString()}
                                />
                                <button
                                    className="w-fit hover:text-slate-700"
                                    type="button"
                                    onClick={() => {
                                        const confirmation = confirm(
                                            "Are you sure you want to delete this notification? This action can not be undone."
                                        );

                                        if (confirmation)
                                            deleteNotification({
                                                id: notification.id,
                                            });
                                    }}
                                >
                                    <FaTrashCan />
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
