"use client";

import FormContainer from "@/components/formatting/FormContainer";
import Footer from "@/components/formatting/PageFooter";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import LoadingCircle from "@/components/icons/LoadingCircle";
import Navbar from "@/components/navigation/Navbar";
import WorkshopSelect from "@/components/ui/WorkshopSelect";
import { UpdateUserProps, useUpdateUser } from "@/hooks/api/useUpdateUser";
import { useUser } from "@/hooks/api/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";

export default function Workshops() {
    const { updateUser, isSuccess, isPending, error } = useUpdateUser();
    const { user, error: noUser } = useUser();

    const [formData, setFormData] = useState<Object>({
        workshop_1_id: "",
        workshop_2_id: "",
        workshop_3_id: "",
    });

    const router = useRouter();

    useEffect(() => {
        if (noUser) {
            router.push("/my-fact/login");
        }

        if (user && !user.registration) {
            router.push("/my-fact/dashboard");
        }

        if (isSuccess) {
            router.push("/my-fact/dashboard");
        }
    }, [isSuccess, noUser, user]);

    return (
        user?.registration && <RegPageContainer>
            <FormContainer
                submitText="Save Changes"
                formName="updateWorkshops"
                onSubmit={() => {
                    updateUser(formData as UpdateUserProps);
                }}
                isLoading={isPending}
                errorMessage={error?.message}
            >
                <div className="text-center text-3xl uppercase font-bold pb-4 border-b w-full">Edit Workshops</div>

                {!user && <LoadingCircle />}
                {user && (
                    <>
                        <div className="text-sm text-slate-700 text-center flex flex-col md:flex-row gap-1 items-center">Just made a change but don&#39;t see it? Refresh the page <div className="text-lg"><IoMdRefresh /></div></div>
                        <WorkshopSelect
                            session={1}
                            id="workshop_1_id"
                            userRegistration={user.registration}
                            setState={setFormData}
                            defaultValue={user.registration[0].workshop.toString()}
                            required={false}
                        />
                        <WorkshopSelect
                            session={2}
                            id="workshop_2_id"
                            userRegistration={user.registration}
                            setState={setFormData}
                            defaultValue={user.registration[1].workshop.toString()}
                            required={false}
                        />
                        <WorkshopSelect
                            session={3}
                            id="workshop_3_id"
                            userRegistration={user.registration}
                            setState={setFormData}
                            defaultValue={user.registration[2].workshop.toString()}
                            required={false}
                        />
                    </>
                )}

                <Link
                    className="text-center text-sm hover:text-highlight-2-primary underline"
                    href="/my-fact/dashboard"
                >
                    Back to Dashboard
                </Link>
            </FormContainer>
        </RegPageContainer>
    );
}
