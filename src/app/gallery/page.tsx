"use client";
import PageContainer from "@/components/formatting/PageContainer";
import Carousel from "@/components/ui/Carousel";
import { useMediaQuery } from "@uidotdev/usehooks";
import dynamic from "next/dynamic";
import React from "react";

const Gallery = () => {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 640px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 641px) and (max-width : 1024px)"
    );

    return (
        <PageContainer title="Gallery" background="bg-gradient mask-(--background-image-blurry-2) mask-size-[1400px] mask-top">
            <Carousel title="Delegate Day" src="delegate-day" length={12} numImages={isSmallDevice ? 1 : (isMediumDevice ? 2 : 3)} />
            <div className="border-b-2 h-4 w-full mb-6 lg:mb-10"></div>
            <Carousel title="Workshops" src="workshop-pics" length={27} numImages={isSmallDevice ? 1 : (isMediumDevice ? 2 : 3)} />
            <div className="border-b-2 h-4 w-full mb-6 lg:mb-10"></div>
            <Carousel title="Palengke" src="palengke" length={24} numImages={isSmallDevice ? 1 : (isMediumDevice ? 2 : 3)} />
            <div className="border-b-2 h-4 w-full mb-6 lg:mb-10"></div>
            <Carousel title="Variety Show" src="variety-show" length={39} numImages={isSmallDevice ? 1 : (isMediumDevice ? 2 : 3)} />
        </PageContainer>
    );
};

export default dynamic(() => Promise.resolve(Gallery), {
  ssr: false,
});