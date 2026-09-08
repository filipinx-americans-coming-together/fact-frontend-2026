"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import TextInput from "@/components/ui/TextInput";
import { useConfirmAdminPasswordReset } from "@/hooks/api/useConfirmAdminPasswordReset";
import { useState } from "react";

export default function AdminResetConfirm({
    params,
}: {
    params: { token: string };
}) {
    const token = params.token;
    const { confirmPasswordReset, isPending, isSuccess, error } =
        useConfirmAdminPasswordReset();

    const [passwords, setPasswords] = useState<{ [key: string]: any }>({});
    const [clientError, setClientError] = useState<string | null>(null);

    return (
        <RegPageContainer pageTitle="Reset Admin Password">
            {isSuccess ? (
                <p className="text-center text-green-700 font-semibold">
                    Password updated. You can log in at{" "}
                    <a href="/admin/login" className="underline">
                        /admin/login
                    </a>
                    .
                </p>
            ) : (
                <FormContainer
                    submitText="Set New Password"
                    formName="adminResetConfirm"
                    onSubmit={() => {
                        if (
                            passwords.password !== passwords.confirm_password
                        ) {
                            setClientError("Passwords do not match");
                            return;
                        }
                        setClientError(null);
                        confirmPasswordReset({
                            token,
                            password: passwords.password,
                        });
                    }}
                    isLoading={isPending}
                    errorMessage={clientError || error?.message}
                >
                    <h1 className="text-center pb-4 border-b w-full">
                        Set a New Password
                    </h1>
                    <TextInput
                        label="New Password"
                        id="password"
                        setState={setPasswords}
                        showCharacters={false}
                        required
                    />
                    <TextInput
                        label="Confirm Password"
                        id="confirm_password"
                        setState={setPasswords}
                        showCharacters={false}
                        required
                    />
                </FormContainer>
            )}
        </RegPageContainer>
    );
}
