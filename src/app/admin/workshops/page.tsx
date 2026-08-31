"use client";

import { useUploadWorkshops } from "@/hooks/api/useUploadWorkshops";
import { useWorkshops } from "@/hooks/api/useWorkshops";
import UploadFile from "../components/UploadFile";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import LoadingCircle from "@/components/icons/LoadingCircle";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import Navbar from "../components/Navbar";
import { useLocations } from "@/hooks/api/useLocations";
import { LocationData } from "@/util/types";

export default function Workshops() {
    const { user, isLoading } = useAdminUser();
    const { workshops } = useWorkshops();
    const { locations, isLoading: isLoadingLocs, error: errorLocs } = useLocations();
    const { uploadWorkshops, error, isPending } = useUploadWorkshops();

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
                <div className="w-9/12 mx-auto">
                    <h1 className="py-6 text-xl">Workshops</h1>
                    <br />
                    {(workshops && workshops.length) === 0 && (
                        <UploadFile
                            title="Workshops"
                            onUpload={uploadWorkshops}
                            errorMessage={error?.message}
                            isLoading={isPending}
                        />
                    )}

                    <br />

                    {[1, 2, 3].map((sessionNum) => {
                        return (
                            <div key={sessionNum}>
                                <h1>Session {sessionNum} Workshops</h1>
                                <div className="border-t-2" />
                                <br />
                                <ul className="flex flex-col gap-2">
                                    {workshops &&
                                        workshops
                                            .filter(
                                                (workshop) =>
                                                    workshop.session ==
                                                    sessionNum
                                            )
                                            .map((workshop) => {
                                                const loc = locations?.filter((location: LocationData) => location.id == workshop.location)[0];
                                                return (
                                                <li
                                                    key={
                                                        workshop.title +
                                                        workshop.session
                                                    }
                                                >
                                                    <div className="font-bold">{workshop.title}</div>
                                                    {loc &&<div className="pl-4">Location: {loc.building} {loc.room_num}</div>}
                                                    <div className="pl-4">Capacity: {workshop.registrationCount} / {loc?.capacity}</div>
                                                </li>);
                                            })}
                                </ul>
                                <br />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
