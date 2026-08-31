"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Navbar from "@/components/navigation/Navbar";
import TextInput from "@/components/ui/TextInput";
import { useSetUpFacilitatorAccount } from "@/hooks/api/useSetUpFacilitatorAccount";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface SetUpData {
    email: string;
    password: string;
    confirm_password: string;
    username: string;
}

export default function FacilitatorAccountSetUp({
    params,
}: {
    params: { slug: string };
}) {
    const token = params.slug;

    const { setUpAccount, isPending, error, isSuccess } =
        useSetUpFacilitatorAccount();

    const [formData, setFormData] = useState<Object>({});

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
                submitText="Confirm"
                formName="setUpFacilitatorAccount"
                onSubmit={() => {
                    if (
                        (formData as SetUpData).password !==
                        (formData as SetUpData).confirm_password
                    ) {
                        setClientError("Passwords do not match");
                    } else {
                        // send request to reset
                        setClientError(undefined);
                        setUpAccount({
                            email: (formData as SetUpData).email,
                            password: (formData as SetUpData).password,
                            token: token,
                        });
                    }
                }}
                isLoading={isPending}
                errorMessage={clientError ? clientError : error?.message}
            >
                <h1 className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">Set Up Your Account</h1>
                <TextInput
                    label="Email"
                    id="email"
                    setState={setFormData}
                    required
                />
                <p className="text-xs text-slate-700">
                    This email will be used for account recovery if you forget
                    your password.
                </p>
                <TextInput
                    label="New Password"
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
                <ul className="text-xs text-slate-700">
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
