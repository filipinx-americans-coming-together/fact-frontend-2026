"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PageContainer from "@/components/formatting/PageContainer";
import LoadingCircle from "@/components/icons/LoadingCircle";
import Image from "next/image";
import { useWorkshop } from "@/hooks/api/useWorkshop";
import { Suspense, useState } from "react";
import Link from "next/link";

function extractWorkshopId(slug: string) {
    const parts = slug.split("-");
    const idPart = parts[parts.length - 1];
    return parseInt(idPart, 10);
}

type Facilitator = {
    id: number;
    department_name: string;
    facilitator_names: string[];
    image_url?: string;
    position: string;
    bio: string;
    attending_networking_session: boolean;
};

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

// Modal component to display facilitator details
const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-red-50 md:w-3/4 lg:w-full"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-sm w-full md:w-3/4 max-w-6xl h-[90vh] md:h-auto mx-4"
            >
                <button
                    className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-3xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="p-4 overflow-y-auto h-full md:max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

// FacilitatorDetail component to display in modal
const FacilitatorDetail = ({ facilitator }: { facilitator: Facilitator }) => {
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div
            // className="fixed inset-0 z-50 flex items-center justify-center bg-red-50 bg-opacity-50 md:w-3/4 lg:w-full"
        >
        <div className="relative w-full flex flex-col md:flex-row items-center text-black p-5">
            <div className="relative flex items-center justify-center w-full md:w-1/2 lg:w-1/2">
                <div className="w-full h-auto max-w-md max-h-[70vh] mx-auto lg:p-8">
                    {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md">
                            <LoadingCircle />
                        </div>
                    )}
                    {facilitator.image_url && (
                        <Image
                            src={facilitator.image_url}
                            alt={facilitator.department_name}
                            layout="intrinsic" // ensures image maintains aspect ratio
                            width={500}
                            height={500}
                            objectFit="contain"
                            className="rounded-md shadow-lg"
                            onLoadingComplete={() => setIsImageLoading(false)}
                            onError={() => setIsImageLoading(false)}
                        />
                    )}
                </div>
            </div>
            <div className="md:ml-6 mt-4 md:mt-0 text-left w-full md:w-1/2 p-5">
                <h2 className="text-2xl md:text-3xl font-bold">
                    {facilitator.department_name}
                </h2>
                {facilitator.position !== "nan" && (
                    <p className="text-sm text-gray-500">{facilitator.position}</p>
                )}
                <p className="mt-4">{facilitator.bio}</p>
                <h2 className="mt-4 text-l font-semibold">{facilitator.attending_networking_session ? "STAYING FOR NETWORKING" : null}</h2>
            </div>
        </div>
        </div>
    );
};

// Main content component
function WorkshopDetailContent({
    params,
}: {
    params: { slug: string };
}) {
    const token = params.slug;
    const workshopId = extractWorkshopId(token);
    const router = useRouter();
    const searchParams = useSearchParams();

    const { workshop, isLoading, error } = useWorkshop({
        id: workshopId ?? 0,
    });
    console.log(workshopId, workshop, isLoading, error)

    const [selectedFacilitator, setSelectedFacilitator] = useState<Facilitator | null>(
        null
    );

    const handleFacilitatorClick = (facilitator: any) => {
        setSelectedFacilitator(facilitator);
    };

    let filterParam = searchParams.get("search");
    let sessionParam = searchParams.get("session");

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingCircle />
            </div>
        );
    }

    if (error || !workshop) {
        // console.log(error);
        return (
            <p className="flex items-center justify-center h-screen text-slate-700">
                Error loading workshop. Please try again later.
            </p>
        );
    }

    const { title, description, session, registrationCount } = workshop.workshop;
    const { building, room_num, capacity } = workshop.location;
    const facilitators = workshop.facilitators;

    // const sessionLabel = session === 3 ? "Career Panel" : "Workshop";
    const sessionLabel = "Workshop";

    const facilitatorLabel =
    // session === 3
    //     ? facilitators.length === 1
    //         ? "Panelist"
    //         : "Panelists"
    //     : 
        facilitators.length === 1
        ? "Facilitator"
        : "Facilitators";

    return (
        <PageContainer title={sessionLabel} background="bg-gradient mask-(--background-image-blurry-3) mask-size-[1400px] mask-top">
            <div className="flex flex-col items-center w-full mx-auto 
                            p-4 md:p-8 rounded-2xl bg-[rgba(240,240,240,0.4)] shadow-xl">
                <h1 className="text-3xl font-bold text-center p-2 md:p-4">{title}</h1>
                <h1 className="text-2xl font-semibold text-center">Session {session}</h1>
                <p className="text-lg text-center px-2 py-12">{description}</p>
                <div className="w-full flex flex-col md:flex-row md:justify-between md:space-x-10 space-y-4 md:space-y-0 text-center">
                    {/** Facilitator/Panelist Details */}
                    <div className="flex-1 flex flex-col space-y-2 bg-[rgba(255,255,255,0.3)] shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold">{facilitatorLabel}:</h2>
                        {facilitators.map((facilitator, index) => (
                            <a
                                key={index}
                                onClick={() => handleFacilitatorClick(facilitator)}
                                className="cursor-pointer underline hover:text-highlight-2-primary transition duration-500"
                            >
                                {facilitator.department_name}
                            </a>
                        ))}
                    </div>

                    {/** Location Details */}
                    <div className="flex-1 flex flex-col space-y-2 bg-[rgba(255,255,255,0.3)] shadow-lg rounded-lg p-4">
                        <h2 className="text-xl font-semibold">Location</h2>
                        <p>Building: {building}</p>
                        <p>Room: {room_num}</p>
                        <p className={`${registrationCount < 0.9*capacity ? "hidden" : "font-medium italic"}`}>{(registrationCount < capacity ? "Low Seats": "Full")}</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-8 px-4">
                {/* <button
                    onClick={() => {
                        router.push(`/workshops?search=${filterParam}&session=${sessionParam}`);
                    }}
                    className="w-full md:w-auto px-4 py-2 bg-highlight-secondary 
                                text-white rounded-md hover:bg-highlight-primary 
                                transition duration-500"
                >
                    &larr; Back
                </button> */}
                <Link href='/workshops' className="px-4 py-2 bg-[rgba(255,255,255,0.5)] shadow-md rounded-md hover:shadow-xl">&larr; Back</Link>
            </div>

            {selectedFacilitator && (
                <Modal onClose={() => handleFacilitatorClick(null)}>
                    <FacilitatorDetail facilitator={selectedFacilitator} />
                </Modal>
            )}
        </PageContainer>
    );
}

// Main component
export default function WorkshopDetail({ params }: { params: { slug: string } }) {
    return (
        <Suspense fallback={<LoadingCircle />}>
            <WorkshopDetailContent params={params} />
        </Suspense>
    );
}