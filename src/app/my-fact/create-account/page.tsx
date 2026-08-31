"use client";

import FormContainer from "@/components/formatting/FormContainer";
import Navbar from "@/components/navigation/Navbar";
import SchoolSelect from "@/components/ui/SchoolSelect";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";

import { registrationProps, useRegister } from "@/hooks/api/useRegister";
import { useEffect, useState } from "react";

import { useRequestEmailVerification } from "@/hooks/api/useRequestEmailVerification";
import { useVerifyEmail } from "@/hooks/api/useVerifyEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/formatting/PageFooter";
import { createAccountProps, useCreateAccount } from "@/hooks/api/useCreateAccount";
import RegPageContainer from "@/components/formatting/RegPageContainer";


export default function CreateAccount() {
    const {createAccount, isSuccess, isPending, error } = useCreateAccount();

    const {
        requestVerification,
        isPending: requestPending,
        error: requestError,
        isSuccess: verificationRequested,
    } = useRequestEmailVerification();

    const {
        verifyEmail,
        isPending: verificationPending,
        error: verificationError,
        isSuccess: emailVerified,
    } = useVerifyEmail();

    const [formData, setFormData] = useState<{ [key: string]: any }>({
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        pronouns: "",
        year: "",
        school_id: -1,
    });

    const [clientError, setClientError] = useState<string | null>(null);

    const router = useRouter();

    // make sure to clear other school data if school_id changes to not be "School not listed"
    useEffect(() => {
        if (formData.school_id !== "School not listed") {
            formData.other_school_name = null;
        }

        if (isSuccess) {
            router.push("/my-fact/register");
        }
    }, [formData.school_id, isSuccess]);

    return (
        <RegPageContainer>
            {!emailVerified && (
                <FormContainer
                    submitText={verificationRequested ? "Verify" : "Next"}
                    formName="emailVerification"
                    onSubmit={() => {
                        if (verificationRequested) {
                            console.log(formData);
                            verifyEmail({
                                email: formData.email,
                                code: formData.code,
                            });
                        } else {
                            requestVerification({ email: formData.email });
                        }
                    }}
                    isLoading={verificationPending || requestPending}
                    errorMessage={
                        verificationError
                            ? verificationError.message
                            : requestError?.message
                    }
                >
                    <div className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">Create Account</div>
                    <TextInput
                        label="Email"
                        id="email"
                        setState={setFormData}
                    />
                    {verificationRequested && (
                        <>
                            <TextInput
                                label="Verification Code"
                                id="code"
                                maxLength={6}
                                setState={setFormData}
                            />
                            <p className="text-xs text-slate-700">
                                {
                                    "A temporary 6-digit code has been sent to your email. Can't find the code? Check your spam folder or search for emails from 'no-reply@psauiuc.org'"
                                }
                            </p>
                        </>
                    )}
                </FormContainer>
            )}

            {emailVerified && (
                <FormContainer
                    submitText="Create Account"
                    formName="createAccountForm"
                    onSubmit={() => {
                        setClientError(null);

                        if (true) {
                            createAccount(formData as createAccountProps);
                        } else {
                            setClientError(
                                "Complete EventBrite checkout before continuing" // change if necessary
                            );
                        }
                    }}
                    isLoading={isPending}
                    errorMessage={clientError || error?.message}
                >
                    {/* <h1 className="text-center text-3xl font-bold pb-4 border-b-2">Create Account</h1> */}

                    <div className="text-left w-full flex flex-col gap-2">
                        <div>Verified Email: <span className="font-bold">{formData.email}</span></div>
                        <a
                            href=""
                            className="text-xs underline text-slate-700 hover:text-highlight-2-primary"
                        >
                            Use a different email
                        </a>
                    </div>

                    <TextInput
                        label="First Name"
                        id="f_name"
                        setState={setFormData}
                    />
                    <TextInput
                        label="Last Name"
                        id="l_name"
                        setState={setFormData}
                    />
                    <TextInput
                        label="Password"
                        id="password"
                        showCharacters={false}
                        setState={setFormData}
                    />
                    <div className="w-full">
                    <TextInput
                        label="Pronouns"
                        id="pronouns"
                        setState={setFormData}
                        required={false}
                    />
                    <p className="text-xs text-slate-600 mt-2 w-fit mx-auto">
                        The pronouns provided will appear on your name tag
                    </p>
                    </div>

                    <Select id="year" label="Year" setState={setFormData}>
                        <option value="Freshman">Freshman</option>
                        <option value="Sophomore">Sophomore</option>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Grad Student">Grad Student</option>
                        <option value="Other">Other</option>
                        <option value="N/A">N/A</option>
                    </Select>

                    {formData.year == "Other" && (
                        <TextInput
                            label="Specify Other Year"
                            id="other_year"
                            setState={setFormData}
                            required={true}
                        />
                    )}

                    <SchoolSelect
                        id="school_id"
                        setState={setFormData}
                        defaultValue="N/A"
                    />

                    {formData.school_id == "School not listed" && (
                        <TextInput
                            label="School Name (no abbreviations please)"
                            id="other_school_name"
                            setState={setFormData}
                            required={true}
                        />
                    )}
                </FormContainer>
            )}

    </RegPageContainer>
    );
}
