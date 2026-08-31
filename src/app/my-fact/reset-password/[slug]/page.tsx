"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Navbar from "@/components/navigation/Navbar";
import TextInput from "@/components/ui/TextInput";
import { useResetPassword } from "@/hooks/api/useResetPassword";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PasswordData {
    password: string;
    confirm_password: string;
}

export default function ResetPassword({
    params,
}: {
    params: { slug: string };
}) {
    const token = params.slug;

    const { resetPassword, isPending, error, isSuccess } = useResetPassword();

    const [passwords, setPasswords] = useState<Object>({
        password: "",
        confirm_password: "",
    });

    const [clientError, setClientError] = useState<string | undefined>();

    const router = useRouter();

    useEffect(() => {
        if (isSuccess) {
            router.push("/my-fact/login");
        }
    }, [isSuccess]);

    return (
        <RegPageContainer>
            <FormContainer
                submitText="Reset Password"
                formName="setPassword"
                onSubmit={() => {
                    if (
                        (passwords as PasswordData).password !==
                        (passwords as PasswordData).confirm_password
                    ) {
                        setClientError("Passwords do not match");
                    } else {
                        // send request to reset
                        setClientError(undefined);
                        resetPassword({
                            password: (passwords as PasswordData).password,
                            token: token,
                        });
                    }
                }}
                isLoading={isPending}
                errorMessage={clientError ? clientError : error?.message}
            >
                <h1>Reset Password</h1>
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
                <ul className="text-xs">
                    <li>
                        Your password can not be too similar to your other
                        personal information
                    </li>
                    <li>Your password must contain at least 8 characters</li>
                    <li>Your password can not be entirely numeric</li>
                </ul>
            </FormContainer>
        </RegPageContainer>
    );
}
