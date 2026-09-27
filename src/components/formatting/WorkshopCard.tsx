import { API_URL } from "@/util/constants";
import { LocationData, WorkshopData, WorkshopResponse } from "@/util/types";
import { useEffect, useState } from "react";
import LoadingCircle from "../icons/LoadingCircle";
import { useWorkshop } from "@/hooks/api/useWorkshop";

interface WorkshopProps {
    id: number;
}

/**
 * Card for individual workshop
 * @param id workshop
 * @returns WorkshopCard component
 */
export default function WorkshopCard(props: WorkshopProps) {
    const { workshop, error } = useWorkshop({ id: props.id });

    return (
        <>
            {error ? (
                <div className="bg-[rgba(250,250,250,0.3)] text-red-700 text-xs px-8 py-4 m-4 rounded-md w-80 shadow-lg text-center">
                    Couldn&#39;t load this workshop. Please refresh, or contact FACT IT if it persists.
                </div>
            ) : workshop ? (
                <div className="bg-[rgba(250,250,250,0.3)] text-black text-xs px-8 py-4 m-4 rounded-md h-24 w-80 shadow-lg">
                    
                    <div>Session {workshop.workshop.session}</div>
                    <div className="text-center">
                        
                        {workshop.workshop.title === "tech-time" ? <div className="font-medium">Your Variety Show act's tech time is during this session.</div> : <>
                        <div className="font-medium">{workshop.workshop.title}</div>
                        <div>
                            {workshop.workshop.session === 1 ? "9:30 AM - 10:40 AM" :
                            workshop.workshop.session === 2 ? "10:50 AM - 12:00 PM" :
                            workshop.workshop.session === 3 ? "1:20 PM - 2:30 PM" :
                            "Time TBD"}
                        </div>
                        <div>
                            {workshop.location.building}{" "}
                            {workshop.location.room_num}
                        </div>
                    
                    </>}
                    </div>
                    
                    
                </div>
            ) : (
                <LoadingCircle />
            )}
        </>
    );
}
