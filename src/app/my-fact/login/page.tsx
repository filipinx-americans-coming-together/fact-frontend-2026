"use client";

import FormContainer from "@/components/formatting/FormContainer";
import Footer from "@/components/formatting/PageFooter";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import Navbar from "@/components/navigation/Navbar";
import TextInput from "@/components/ui/TextInput";
import { useFacilitatorLogin } from "@/hooks/api/useFacilitatorLogin";
import { useLogin } from "@/hooks/api/useLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
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
        if (isSuccess) {
            router.push("/my-fact/dashboard");
        }

        if (facilitatorSuccess) {
            router.push("/facilitators/dashboard");
        }
    }, [isSuccess, error, facilitatorSuccess]);

    return (
        <RegPageContainer>

            {/* toggle log in type */}
            <div className="mx-auto p-2 border-2 border-highlight-2-secondary rounded-sm w-fit flex gap-4">
                <button
                    type="button"
                    className={
                        (isDelegate
                            ? "bg-highlight-2-secondary text-background-primary rounded-sm"
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
                            ? "bg-highlight-2-secondary text-background-primary rounded-sm"
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
                    className="underline text-slate-700 text-xs hover:text-highlight-2-primary"
                >
                    Forgot Password?
                </Link>


                <div className="text-center text-md">
                    {isDelegate ? (
                        <>
                            New to FACT?{" "}
                            <a
                                href="/my-fact/create-account"
                                className="underline hover:text-highlight-2-primary"
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
        
        </RegPageContainer>
    );
}
