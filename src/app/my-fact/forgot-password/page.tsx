"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import TextInput from "@/components/ui/TextInput";
import { useRequestPasswordReset } from "@/hooks/api/useRequestPasswordReset";
import { getErrorCode } from "@/util/apiError";
import { useState } from "react";

export default function ForgotPassword() {
    const { requestPasswordReset, isPending, error, isSuccess } =
        useRequestPasswordReset();

    const [formData, setFormData] = useState<Object>({
        email: "",
    });

    return (
        <RegPageContainer pageTitle="Forgot Password">

            {isSuccess ? (
                <div className="w-7/12 min-w-[460px] px-20 py-12 bg-[var(--white)] m-auto rounded-lg" style={{ boxShadow: "0 10px 28px rgba(14,21,94,0.12)", outline: "1px solid var(--hairline-on-light)" }}>
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
                    errorCode={getErrorCode(error)}
                >
                    <h1 className="text-center pb-4 border-b w-full">Reset Password</h1>
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
