"use client";

import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import LoadingCircle from "@/components/icons/LoadingCircle";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import Navbar from "../components/Navbar";
import UploadFile from "../components/UploadFile";
import { useUploadFacilitatorEmails } from "../hooks/useUploadFacilitatorEmails";

export default function FacilitatorAccounts() {
    const { user, isLoading } = useAdminUser();
    const { uploadFacilitatorEmails, isPending, isSuccess, error, data } = useUploadFacilitatorEmails()

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
    
    return(
        <>
            <Navbar/>
            <div className="min-h-screen bg-slate-50 text-black">
                <div className="w-9/12 mx-auto">
                    <h1 className="py-6 text-xl">Email Facilitator Account Set Ups</h1>
                    {isSuccess ? 
                        <>
                            <div>{data?.message}</div>
                            {data?.failed.map((msg, idx) => {return(<div className="text-red-600" key={idx}>{msg}</div>)})}
                        </> : <UploadFile
                        title="Facilitator emails"
                        onUpload={uploadFacilitatorEmails}
                        errorMessage={error?.message}
                        isLoading={isPending}
                    />}
                    </div>
                    </div>
        </>
    );
}