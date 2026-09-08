"use client";
import { SiteHeader } from "@/components/site/SiteHeader";
import InteractiveButton from "@/components/ui/InteractiveButton";
import FacilitatorRegistration from "../components/FacilitatorRegistration";
import { useLogout } from "@/hooks/api/useLogout";
import { useFacilitatorUser } from "@/hooks/api/useFacilitatorUser";
import { useWorkshops } from "@/hooks/api/useWorkshops";
import { useMemo, useState } from "react";
import LoadingCircle from "@/components/icons/LoadingCircle";
import WorkshopInfo from "../components/WorkshopInfo";
import { useRouter } from "next/navigation";
import RegPageContainer from "@/components/formatting/RegPageContainer";

export default function FacilitatorDashboard() {
    const { logout } = useLogout();
    const { user, isLoading } = useFacilitatorUser();
    const { workshops } = useWorkshops();
    const router = useRouter();

    const facilitatedSessions = useMemo(() => {
        if (!user || !workshops) {
            return [];
        }

        const result: { title: string, workshop: number; session: number }[] = [];

        user.workshops.forEach((facilitatorWorkshop) => {
            const workshop = workshops.find(
                (workshop) => facilitatorWorkshop.workshop === workshop.id
            );

            if (workshop) {
                result.push({
                    title: workshop.title,
                    workshop: workshop.id,
                    session: workshop.session,
                });
            }
        });

        return result;
    }, [user, workshops]);

    const facilitatorRegistrations = useMemo(() => {
        if (!user || !workshops) {
            return [];
        }

        const result: {
            facilitator_name: string;
            workshop: number;
            session: number;
        }[] = [];

        user.registrations.forEach((registration) => {
            const workshop = workshops.find(
                (workshop) => registration.workshop === workshop.id
            );

            if (workshop) {
                result.push({
                    facilitator_name: registration.facilitator_name,
                    workshop: workshop.id,
                    session: workshop.session,
                });
            }
        });

        return result;
    }, [user, workshops]);

    if (isLoading) {
        return (
            <>
                <SiteHeader compact pageTitle="Facilitator Dashboard" />
                <div className="my-2 w-fit mx-auto">
                    <LoadingCircle />
                </div>
            </>
        );
    }

    if (!user) {
        return (
            <RegPageContainer pageTitle="Facilitator Dashboard">
                <p className="text-center">
                    You are not permitted to view this page. If you think
                    this is a mistake, please try logging in again.
                </p>
            </RegPageContainer>
        );
    }

    return (
        <RegPageContainer pageTitle={user.facilitator.department_name}>
            <div className="bg-[rgba(240,240,240,0.3)] py-8 px-12 rounded-xl w-9/12 mx-auto flex flex-col items-left gap-10">
                <div className="flex flex-col md:flex-row md:justify-between gap-2">
                    <div className="w-fit ml-auto">
                        <InteractiveButton
                            text="Log Out"
                            onClick={() => {
                                logout();
                                router.push("/");
                            }}
                        />
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-bold w-full border-b-2 pb-2" style={{ borderColor: "var(--hairline-on-light)" }}>
                        Your Workshops
                    </h1>
                    <br />
                    <div className="flex flex-col gap-6">
                        {facilitatedSessions.sort((a,b) => a.session - b.session).map((facilitatorWorkshop) => (
                            <WorkshopInfo
                                key={facilitatorWorkshop.workshop}
                                workshopID={facilitatorWorkshop.workshop}
                            />
                        ))}
                    </div>
                </div>

                <FacilitatorRegistration
                    facilitators={user.facilitator.facilitator_names}
                    facilitatedSessions={facilitatedSessions}
                    registrations={facilitatorRegistrations}
                />
            </div>
        </RegPageContainer>
    );
}
