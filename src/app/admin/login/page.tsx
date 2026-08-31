"use client";

import FormContainer from "@/components/formatting/FormContainer";
import Navbar from "@/components/navigation/Navbar";
import TextInput from "@/components/ui/TextInput";
import { useAdminLogin } from "@/hooks/api/useAdminLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLogin() {
    const { login, error, isPending, isSuccess } = useAdminLogin();
    const router = useRouter();

    const [formData, setFormData] = useState<Object>({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (isSuccess) {
            router.push("/admin/dashboard");
        }
    }, [isSuccess]);

    return (
        <div className="min-h-screen bg-slate-50 text-black">
            <div className="bg-background-primary w-full">
                <Navbar />
            </div>
            <div className="w-9/12 mx-auto">
                <br />
                <FormContainer
                    submitText="Log in"
                    formName="loginForm"
                    onSubmit={() => {
                        login(
                            formData as { username: string; password: string }
                        );
                    }}
                    isLoading={isPending}
                    errorMessage={error?.message}
                >
                    <div className="text-center">Admin Login</div>
                    <TextInput
                        label="Username"
                        id="username"
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
                        className="underline text-highlight-secondary text-xs hover:text-highlight-primary"
                    >
                        Forgot Password
                    </Link>

                    <br />
                </FormContainer>
            </div>
        </div>
    );
}
