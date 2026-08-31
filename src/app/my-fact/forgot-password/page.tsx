"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Navbar from "@/components/navigation/Navbar";
import TextInput from "@/components/ui/TextInput";
import { useRequestPasswordReset } from "@/hooks/api/useRequestPasswordReset";
import { useState } from "react";

export default function ForgotPassword() {
    const { requestPasswordReset, isPending, error, isSuccess } =
        useRequestPasswordReset();

    const [formData, setFormData] = useState<Object>({
        email: "",
    });

    return (
        <RegPageContainer>

            {isSuccess ? (
                <div className="w-7/12 min-w-[460px] px-20 py-12 bg-[rgba(240,240,240,0.3)] m-auto rounded-lg">
                    If an account with the email{" "}
                    <span className="font-bold whitespace-nowrap">{(formData as { email: string }).email}</span> exists, instructions
                    to reset your password have been sent there. If you can not
                    find the email, please check your spam folder or search for
                    emails from <span className="font-bold whitespace-nowrap">no-reply@psauiuc.org</span>
                </div>
            ) : (
                <FormContainer
                    submitText="Reset Password"
                    formName="resetPassword"
                    onSubmit={() => {
                        if (!isSuccess) {
                            requestPasswordReset({
                                email: (formData as { email: string }).email,
                            });
                        }
                    }}
                    isLoading={isPending}
                    errorMessage={error?.message}
                >
                    <h1 className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">Reset Password</h1>
                    <TextInput
                        label="Email"
                        id="email"
                        setState={setFormData}
                        required
                    />
                </FormContainer>
            )}
        </RegPageContainer>
    );
}
