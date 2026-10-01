"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import LoadingCircle from "@/components/icons/LoadingCircle";
import TextInput from "@/components/ui/TextInput";
import { useFacilitatorLogin } from "@/hooks/api/useFacilitatorLogin";
import { useLogin } from "@/hooks/api/useLogin";
import { useUser } from "@/hooks/api/useUser";
import { getErrorCode } from "@/util/apiError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
    const { user, isLoading, error: userError } = useUser();
    const { login, isPending, error, isSuccess } = useLogin();
    const {
        login: facilitatorLogin,
        isPending: facilitatorPending,
        error: facilitatorError,
        isSuccess: facilitatorSuccess,
    } = useFacilitatorLogin();

    const [isDelegate, setIsDelegate] = useState(true);

    const [formData, setFormData] = useState<Object>({
        email: "",
        password: "",
    });

    const router = useRouter();
    useEffect(() => {
        if (user) {
            router.push("/my-fact/dashboard");
        }
    }, [user]);

    useEffect(() => {
        if (isSuccess) {
            router.push("/my-fact/dashboard");
        }

        if (facilitatorSuccess) {
            router.push("/facilitators/dashboard");
        }
    }, [isSuccess, error, facilitatorSuccess]);

    return (
        <RegPageContainer pageTitle="Log In" pageSubtitle="Access your FACT account.">
            {isLoading ?<div className="flex justify-center"><LoadingCircle /> </div>:
            <>
            {/* toggle log in type */}
            <div className="mx-auto p-2 border-2 border-[var(--violet-800)] rounded-sm w-fit flex gap-4">
                <button
                    type="button"
                    className={
                        (isDelegate
                            ? "bg-[var(--violet-800)] text-[var(--cream-100)] rounded-sm"
                            : "") + " py-2 px-4"
                    }
                    onClick={(event) => {
                        event.preventDefault();
                        setIsDelegate(true);
                    }}
                >
                    Delegate
                </button>
                <button
                    type="button"
                    className={
                        (!isDelegate
                            ? "bg-[var(--violet-800)] text-[var(--cream-100)] rounded-sm"
                            : "") + " py-2 px-4"
                    }
                    onClick={(event) => {
                        event.preventDefault();
                        setIsDelegate(false);
                    }}
                >
                    Facilitator
                </button>
            </div>

            <br/>

            <FormContainer
                submitText="Log in"
                formName="loginForm"
                onSubmit={() => {
                    if (isDelegate) {
                        login(formData as { email: string; password: string });
                    } else {
                        facilitatorLogin(
                            formData as { username: string; password: string }
                        );
                    }
                }}
                isLoading={isPending || facilitatorPending}
                errorMessage={error ? error.message : facilitatorError?.message}
                errorCode={getErrorCode(error || facilitatorError)}
            >
                <div className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">
                    {isDelegate ? "Delegate " : "Facilitator "}Login
                </div>
                <TextInput
                    label={isDelegate ? "Email" : "Username"}
                    id={isDelegate ? "email" : "username"}
                    setState={setFormData}
                />
                <TextInput
                    label="Password"
                    id="password"
                    showCharacters={false}
                    setState={setFormData}
                />

                <Link
                    href="/my-fact/forgot-password"
                    className="underline text-[var(--ink-on-light-dim)] text-xs hover:text-[var(--violet-800)]"
                >
                    Forgot Password?
                </Link>


                <div className="text-center text-md">
                    {isDelegate ? (
                        <>
                            New to FACT?{" "}
                            <a
                                href="/my-fact/create-account"
                                className="underline hover:text-[var(--violet-800)]"
                            >
                                Create an account
                            </a>
                        </>
                    ) : (
                        <p>
                            First time logging in? Check your email for detailed
                            instructions on how to log in.
                        </p>
                    )}
                </div>

            </FormContainer>
            </>}
        
        </RegPageContainer>
    );
}
