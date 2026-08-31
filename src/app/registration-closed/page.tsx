'use client';

import PageContainer from "@/components/formatting/PageContainer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/formatting/PageFooter";

export default function RegistrationClosed() {
    const router = useRouter();
    const [seconds, setSeconds] = useState(10);
    
    seconds > 0 ? setTimeout(() => setSeconds(seconds-1), 1000) : router.push('/')

    return (
        <div className="h-fit w-screen relative">
                <div className="flex flex-col min-h-screen justify-between gap-10 lg:gap-15">
                    <Navbar />
                    <div className="-z-10 absolute inset-0 w-full grow bg-gradient mask-(--background-image-blurry-3) mask-size-[1400px] mask-top`"></div>
                        <div className="relative flex flex-col items-center gap-8">
                                <div className="flex flex-col items-center gap-5 w-3/4 sm:w-7/12 sm:min-w-[460px] px-4 py-12 bg-[rgba(240,240,240,0.3)] rounded-xl shadow-lg">
                                    <div className="text-center text-xl sm:text-2xl font-bold">The My FACT Portal is unavailable until FACT 2026 Registration.</div>
                                    <div className="w-fit p-4 bg-[rgba(240,240,240,0.3)] text-sm sm:text-base text-center rounded-lg shadow-md">Redirecting to Home Page in {seconds} seconds.</div>
                                </div>
                                <Link href='/' className="px-4 py-2 bg-[rgba(255,255,255,0.3)] shadow-md rounded-md hover:shadow-xl text-sm sm:text-base">&larr; Back Home</Link>
                        </div>
                    <Footer />
                    </div>
                </div>
        
    );
}
