"use client";

import UserAgenda from "@/components/formatting/UserAgenda";
import WorkshopCard from "@/components/formatting/WorkshopCard";
import LoadingCircle from "@/components/icons/LoadingCircle";
import Navbar from "@/components/navigation/Navbar";
import InteractiveButton from "@/components/ui/InteractiveButton";
import LinkButton from "@/components/ui/LinkButton";
import { useLogout } from "@/hooks/api/useLogout";
import NotificationsManager from "@/components/ui/NotificationManager";
import { useNotifications } from "@/hooks/api/useNotifications";
import { useUser } from "@/hooks/api/useUser";
import { useRegistrationFlag } from "@/hooks/api/useRegistrationFlag";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import { GiGClef } from "react-icons/gi";
import Link from "next/link";
import { IoMdRefresh } from "react-icons/io";

export default function Dashboard() {
    const { user, isLoading, error } = useUser();
    const { logout, isSuccess, isPending: logoutLoading } = useLogout();
    const { notifications } = useNotifications();
    const { flag } = useRegistrationFlag("workshop-changes");
    const router = useRouter();


    useEffect(() => {
        if (isSuccess) {
            router.push("/");
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            router.push("/my-fact/login");
        }
    }, [error])

    // useEffect(() => {
    //     if (!user?.registration || !user.registration.length) {
    //         router.push("register");
    //     }
    // }, [user])

    return (
        <div>
        <RegPageContainer>
            {user ?
            <>
            {notifications && (
                <NotificationsManager
                    notifications={notifications.map(
                        (notification) => notification.message
                    )}
                />
            )} {user.registration && <div className="bg-[rgba(240,240,240,0.3)] py-8 px-12 rounded-xl min-w-9/12 w-fit flex justify-evenly flex-col text-left mx-auto gap-10 md:gap-16">

                <div className="font-bold text-4xl my-2 flex items-center">
                            Welcome, {user.user.first_name} {user.user.last_name} <span className="text-5xl"><GiGClef /></span>
                        </div>
                        {user.registration.length ? 
                <div className="flex justify-between flex-col xl:flex-row">
                <div className="flex flex-col">
                
                        <div className="text-center my-6">
                        <LinkButton
                            text="EDIT PROFILE"
                            url="/my-fact/profile"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center px-2 py-4 my-4 gap-2 md:gap-3">
                        {user.registration.map((pair) => (
                                <WorkshopCard
                                    key={pair.workshop}
                                    id={pair.workshop}
                                />
                            ))}
                            <div className="text-sm text-slate-700 text-center flex flex-col md:flex-row gap-1 items-center">Just made a change but don&#39;t see it? Refresh the page <div className="text-lg"><IoMdRefresh /></div></div>
                            {flag?.value ? (
                                <div className="text-center my-6">
                                    <LinkButton
                                        text="UPDATE WORKSHOPS"
                                        url="/my-fact/workshops"
                                    />
                                </div>
                            ) : (
                                <div className="text-center my-6 text-xs">
                                    Workshop changes are not available at this time.
                                </div>
                            )}
                            
                        
                    </div>
                    </div>
                    <UserAgenda/>
                    </div> : <div className="flex flex-col gap-4 items-center">
                        <Link href="/my-fact/register" className="py-4 px-6 shadow-lg hover:shadow-xl font-bold bg-[rgba(255,255,255,0.3)] rounded-xl w-fit mx-auto text-xl">Register for FACT 2025</Link>
                        <div className="text-sm text-slate-700 text-center flex flex-col md:flex-row gap-1 items-center">Just finished registering? Refresh the page to load the dashboard <div className="text-lg"><IoMdRefresh /></div></div>
                        </div>
                     }
                    <div className="mx-auto my-6 w-fit text-background-primary">
                <InteractiveButton
                    text="Log out"
                    onClick={() => {
                        logout();
                        router.push("/");
                    }}
                />
                
            </div> </div>}</> : <div className="w-fit mx-auto"><LoadingCircle/></div>}
        
         </RegPageContainer> 
        
        </div>
    );
}
