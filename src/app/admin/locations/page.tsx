"use client";

import { useUploadLocations } from "@/hooks/api/useUploadLocations";
import UploadFile from "../components/UploadFile";
import { useLocations } from "@/hooks/api/useLocations";
import { useAdminUser } from "@/hooks/api/useAdminUser";
import LoadingCircle from "@/components/icons/LoadingCircle";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import AddLocationForm from "../components/AddLocationForm";
import UpdateLocationForm from "../components/UpdateLocationForm";
import DeleteLocationForm from "../components/DeleteLocationForm";
import Navbar from "../components/Navbar";

export default function Locations() {
    const { user, isLoading } = useAdminUser();
    const { locations } = useLocations();
    const { uploadLocations, error, isPending } = useUploadLocations();

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
                    <h1 className="py-6 text-xl">Locations</h1>
                    <br />
                    {(locations && locations.length) === 0 && (
                        <UploadFile
                            title="Locations"
                            onUpload={uploadLocations}
                            errorMessage={error?.message}
                            isLoading={isPending}
                        />
                    )}

                    <br />

                    {[1, 2, 3].map((sessionNum) => {
                        return (
                            <div key={sessionNum}>
                                <h1>Session {sessionNum} Locations</h1>
                                <div className="border-t-2" />
                                <br />
                                <ul className="grid grid-cols-4 gap-2">
                                    {locations &&
                                        locations
                                            .filter(
                                                (location) =>
                                                    location.session ==
                                                    sessionNum
                                            )
                                            .map((location) => (
                                                <li
                                                    key={
                                                        location.building +
                                                        location.room_num +
                                                        location.session
                                                    }
                                                >
                                                    {location.building}{" "}
                                                    {location.room_num}
                                                </li>
                                            ))}
                                </ul>
                                <br />
                            </div>
                        );
                    })}
                </div>
                <div className="w-9/12 mx-auto text-center">
                    <div className="pb-10">
                        <h1>Add New Location</h1>
                        <AddLocationForm />
                    </div>

                    <div className="pb-10">
                        <h1>Update Location</h1>
                        <UpdateLocationForm locations={locations} />
                    </div>

                    {/* <div className="pb-10">
                        <h1>Delete Location</h1>
                        <DeleteLocationForm locations={locations} />
                    </div> */}
                </div>
            </div>
        </>
    );
}
