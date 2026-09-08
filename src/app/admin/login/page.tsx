"use client";

import FormContainer from "@/components/formatting/FormContainer";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import TextInput from "@/components/ui/TextInput";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useAdminLogin } from "@/hooks/api/useAdminLogin";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLogin() {
    const { login, error, isPending, isSuccess } = useAdminLogin();
    const { user: existingAdmin, isLoading: checkingExisting } = useAdminUser();
    const router = useRouter();

    const [formData, setFormData] = useState<Object>({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (isSuccess || existingAdmin) {
            router.push("/admin/dashboard");
        }
    }, [isSuccess, existingAdmin]);

    // Already authenticated as an admin (e.g. logged in via /my-fact/login
    // with an account that's in FACTAdmin — same shared session either way)
    // — skip the form instead of asking to log in again.
    if (checkingExisting || existingAdmin) {
        return (
            <div className="mx-auto w-fit p-4">
                <LoadingCircle />
            </div>
        );
    }

    return (
        <RegPageContainer pageTitle="Admin Login" pageSubtitle="Access the FACT admin tools.">
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
                <h1 className="text-center pb-4 border-b w-full">Admin Login</h1>
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
                <p className="text-center text-slate-700 text-xs">
                    Forgot your password? Ask another admin to reset it for you
                    from the Promote Admin page.
                </p>

                <br />
            </FormContainer>
        </RegPageContainer>
    );
}
