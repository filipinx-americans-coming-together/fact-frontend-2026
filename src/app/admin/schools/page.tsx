"use client";

import { useSchools } from "@/hooks/api/useSchools";
import { useUploadSchools } from "@/hooks/api/useUploadSchools";
import UploadFile from "../components/UploadFile";
import TextInput from "@/components/ui/TextInput";
import { useNewSchools } from "../hooks/useNewSchools";
import Button from "../components/Button";
import { useApproveSchool } from "../hooks/useApproveSchool";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";

export default function Schools() {
    const { user, isLoading } = useAdminUser();
    const { schools } = useSchools();
    const { newSchools } = useNewSchools();
    const { uploadSchools, error, isPending } = useUploadSchools();
    const { approveSchool, isPending: approvePending } = useApproveSchool();

    const [schoolData, setSchoolData] = useState<Object>({ approved_name: "" });

    if (isLoading) {
        return (
            <div className="mx-auto w-fit p-4">
                <LoadingCircle />
            </div>
        );
    }

    if (!user) {
        return <ForbiddenPage />;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 text-black">
                <div className="w-9/12 mx-auto text-left">
                    <h1 className="py-6 text-xl">Schools</h1>

                    <br />
                    {(schools && schools.length) === 0 && (
                        <UploadFile
                            title="Schools"
                            onUpload={uploadSchools}
                            errorMessage={error?.message}
                            isLoading={isPending}
                        />
                    )}

                    <br />
                    <h1>
                        Requested Schools - Fill in the blank for &quot;School
                        not listed&quot;
                    </h1>
                    <div className="border-t-2" />
                    <br />
                    <div className="flex flex-col gap-4">
                        {newSchools &&
                            newSchools.map((school) => (
                                <div
                                    key={school.id}
                                    className="rounded shadow-sm bg-gray-300 p-6 grid grid-cols-1 gap-2 md:grid-cols-3"
                                >
                                    <p className="text-blue-600">
                                        {school.name}
                                    </p>
                                    <TextInput
                                        label="Approved Name"
                                        id="approved_name"
                                        setState={setSchoolData}
                                        placeholder={school.name}
                                    />
                                    <div className="flex items-center justify-center ">
                                        {approvePending ? (
                                            <LoadingCircle />
                                        ) : (
                                            <Button
                                                text="Approve"
                                                onClick={() => {
                                                    let approved_name = (
                                                        schoolData as {
                                                            approved_name: string;
                                                        }
                                                    ).approved_name;

                                                    if (!approved_name) {
                                                        approved_name =
                                                            school.name;
                                                    }

                                                    approveSchool({
                                                        other_school:
                                                            school.name,
                                                        approved_name:
                                                            approved_name,
                                                    });
                                                }}
                                                isSubmit={false}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>

                    <br />
                    <h1>All Schools</h1>
                    <div className="border-t-2" />
                    <br />
                    <ul className="grid grid-cols-4 gap-2">
                        {schools &&
                            schools.map((school) => (
                                <li key={school.name}>{school.name}</li>
                            ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
