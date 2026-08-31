"use client";

import { useAdminUser } from "@/hooks/api/useAdminUser";
import ForbiddenPage from "@/components/formatting/ForbiddenPage";
import Navbar from "../components/Navbar";
import LoadingCircle from "@/components/icons/LoadingCircle";
import NotificationManager from "../components/NotificationManager";
import Stats from "../components/Stats";
import { FaDownload } from "react-icons/fa6";
import DangerZone from "../components/DangerZone";
import useDownloadFile from "../hooks/useDownloadFile";
import { API_URL } from "@/util/constants";

export default function AdminDashboard() {
    const { user, isLoading } = useAdminUser();

    const downloadDelegates = useDownloadFile(
        `${API_URL}/fact-admin/sheets/delegates/`,
        "delegates"
    );
    const downloadLocations = useDownloadFile(
        `${API_URL}/fact-admin/sheets/locations/`,
        "locations"
    );

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

    // dashboard
    return (
        <div className="min-h-screen bg-slate-50 text-black">
            <Navbar />
            <div className="w-9/12 mx-auto">
                <br />
                <br />
                {/* stats */}
                <h1 className="text-xl font-bold">At a Glance</h1>
                <br />
                <Stats />

                <br />
                {/* downloads */}
                <div>
                    <button
                        className="flex items-center gap-2 hover:underline"
                        onClick={downloadDelegates}
                    >
                        Download Delegate Data <FaDownload />
                    </button>

                    <button
                        className="flex items-center gap-2 hover:underline"
                        onClick={downloadLocations}
                    >
                        Download Workshop Locations <FaDownload />
                    </button>
                </div>

                <br />
                {/* notifications */}
                <h1 className="text-xl font-bold">Notifications</h1>
                <br />
                <NotificationManager />

                <br />
                {/* danger zone */}
                <h1 className="text-xl font-bold text-red-600">Danger Zone</h1>
                <br />
                <DangerZone />
            </div>
            <br />
        </div>
    );
}
