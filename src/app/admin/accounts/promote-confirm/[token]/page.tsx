"use client";

import LoadingCircle from "@/components/icons/LoadingCircle";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import FormContainer from "@/components/formatting/FormContainer";
import TextInput from "@/components/ui/TextInput";
import { useConfirmAdminPromotion } from "@/hooks/api/useConfirmAdminPromotion";
import { usePromoteAdminStatus } from "@/hooks/api/usePromoteAdminStatus";
import { useState } from "react";

interface NewAccountData {
    password: string;
    confirm_password: string;
}

export default function PromoteConfirm({
    params,
}: {
    params: { token: string };
}) {
    const token = params.token;
    const { confirmPromotion, isPending, isSuccess, error } =
        useConfirmAdminPromotion();
    const { isNewAccount, isLoading: statusLoading } =
        usePromoteAdminStatus(token);

    const [formData, setFormData] = useState<Object>({});
    const [clientError, setClientError] = useState<string | undefined>();

    return (
        <RegPageContainer pageTitle="FACT Admin Access">
            <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
                {isSuccess ? (
                    <p className="text-green-700 font-semibold">
                        Admin access granted. You can log in at{" "}
                        <a href="/admin/login" className="underline">
                            /admin/login
                        </a>
                        .
                    </p>
                ) : statusLoading ? (
                    <LoadingCircle />
                ) : isNewAccount ? (
                    <div className="w-full text-left">
                        <FormContainer
                            submitText="Create Account"
                            formName="createAdminAccount"
                            onSubmit={() => {
                                const data = formData as NewAccountData;
                                if (data.password !== data.confirm_password) {
                                    setClientError("Passwords do not match");
                                } else {
                                    setClientError(undefined);
                                    confirmPromotion({
                                        token,
                                        password: data.password,
                                    });
                                }
                            }}
                            isLoading={isPending}
                            errorMessage={clientError ? clientError : error?.message}
                        >
                            <p className="text-center">
                                You've been invited to create a FACT admin
                                account. Set a password to finish.
                            </p>
                            <TextInput
                                label="Password"
                                id="password"
                                setState={setFormData}
                                showCharacters={false}
                                required
                            />
                            <TextInput
                                label="Confirm Password"
                                id="confirm_password"
                                setState={setFormData}
                                showCharacters={false}
                                required
                            />
                        </FormContainer>
                    </div>
                ) : (
                    <>
                        <p>
                            Someone at FACT has requested that your account be
                            given admin access. Nothing has changed yet.
                            Click below to accept.
                        </p>

                        {isPending ? (
                            <LoadingCircle />
                        ) : (
                            <button
                                onClick={() => confirmPromotion({ token })}
                                className="pill pill--ink"
                            >
                                Accept Admin Access
                            </button>
                        )}

                        {error && (
                            <p className="text-red-600">{error.message}</p>
                        )}
                    </>
                )}
            </div>
        </RegPageContainer>
    );
}
