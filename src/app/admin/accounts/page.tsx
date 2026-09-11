"use client";

import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import Navbar from "../components/Navbar";
import FormContainer from "../components/FormContainer";
import TextInput from "@/components/ui/TextInput";
import { useState } from "react";
import { usePromoteAdmin } from "../hooks/usePromoteAdmin";
import { useResetAdminPassword } from "../hooks/useResetAdminPassword";

export default function Accounts() {
    const { user, isLoading } = useAdminUser();
    const { promoteAdmin, isPending, isSuccess, error, data, reset } =
        usePromoteAdmin();
    const {
        resetAdminPassword,
        isPending: resetPending,
        isSuccess: resetSuccess,
        error: resetError,
        data: resetData,
        reset: resetReset,
    } = useResetAdminPassword();

    const [formData, setFormData] = useState<{ [key: string]: any }>({});
    const [resetFormData, setResetFormData] = useState<{ [key: string]: any }>({});

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
                    <h1 className="text-xl">Promote to Admin</h1>
                    <p className="text-sm text-slate-600 max-w-2xl">
                        The person must already have a FACT account. They'll
                        get an email with a link to accept, and nothing changes
                        until they click it.
                    </p>
                    <br />

                    {isSuccess ? (
                        <div className="flex flex-col gap-3">
                            <p className="text-green-700 font-semibold">
                                {data?.message}
                            </p>
                            <button
                                className="w-fit underline text-sm"
                                onClick={() => {
                                    setFormData({});
                                    reset();
                                }}
                            >
                                Promote someone else
                            </button>
                        </div>
                    ) : (
                        <FormContainer
                            formName="promoteAdmin"
                            submitText="Send Promotion Request"
                            isLoading={isPending}
                            errorMessage={error?.message}
                            onSubmit={() => {
                                promoteAdmin(formData.email);
                            }}
                        >
                            <TextInput
                                label="Email"
                                id="email"
                                setState={setFormData}
                                required={true}
                            />
                        </FormContainer>
                    )}

                    <br />
                    <br />

                    <h1 className="text-xl">Reset Another Admin's Password</h1>
                    <p className="text-sm text-slate-600 max-w-2xl">
                        There's no self-service admin password reset, so send a
                        reset link to another admin's email instead. Nothing
                        changes until they click it and choose a new password.
                    </p>
                    <br />

                    {resetSuccess ? (
                        <div className="flex flex-col gap-3">
                            <p className="text-green-700 font-semibold">
                                {resetData?.message}
                            </p>
                            <button
                                className="w-fit underline text-sm"
                                onClick={() => {
                                    setResetFormData({});
                                    resetReset();
                                }}
                            >
                                Reset someone else's password
                            </button>
                        </div>
                    ) : (
                        <FormContainer
                            formName="resetAdminPassword"
                            submitText="Send Reset Link"
                            isLoading={resetPending}
                            errorMessage={resetError?.message}
                            onSubmit={() => {
                                resetAdminPassword(resetFormData.email);
                            }}
                        >
                            <TextInput
                                label="Admin Email"
                                id="email"
                                setState={setResetFormData}
                                required={true}
                            />
                        </FormContainer>
                    )}
                </div>
            </div>
        </>
    );
}
