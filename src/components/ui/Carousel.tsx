"use client";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from 'next/image';

const IMG_HEIGHT = 3456;
const IMG_WIDTH = 5184;
const PLACEHOLDER_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPU9vG2BwACbwEDalojHwAAAABJRU5ErkJggg==";
const TRANSPARENT_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

interface CarouselProps {
    title: string;
    src: string;
    length: number;
    numImages: number;
}

/**
 * Image carousel
 * @param title title to display above carousel
 * @param src folder in public to display images from
 * @param length number of images in the folder (labeled 1.JPG, 2.JPG, ..., [length].JPG)
 * @returns LinkButton
 */
export default function Carousel({ title, src, length, numImages }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(1);

    return (
        <>
            <div className={`text-${(numImages === 1 ? "xl" : "3xl")} font-medium text-center uppercase`}>{title}</div>
            <div className="flex flex-row justify-between my-6 lg:my-10 h-fit w-full gap-8">
                <div
                    className="w-fit cursor-pointer self-center text-2xl lg:text-4xl"
                    onClick={() =>
                        setCurrentIndex(() =>
                            currentIndex - numImages < 1
                                ? ~~((length - 1) / numImages) * numImages + 1
                                : currentIndex - numImages
                        )
                    }
                >
                    <IoIosArrowBack />
                </div>
                <div className="">
                    <Image
                        key={currentIndex}
                        src={`/${src}/${currentIndex}.jpg`}
                        height={IMG_HEIGHT}
                        width={IMG_WIDTH}
                        className="aspect-3/2 object-cover"
                        alt=""
                        placeholder={PLACEHOLDER_URL}
                    />
                </div>
				{numImages > 1 && <div className="">
                    <Image
                        key={currentIndex + 1}
                        src={currentIndex + 1 > length ? TRANSPARENT_URL : `/${src}/${currentIndex + 1}.jpg`}
                        height={currentIndex + 1 > length ? 1 : IMG_HEIGHT}
                        width={currentIndex + 1 > length ? 1 : IMG_WIDTH}
                        className="aspect-3/2 object-cover"
                        alt=""
                        placeholder={currentIndex + 1 > length ? TRANSPARENT_URL : PLACEHOLDER_URL}
                    />
                </div>}
                
                {numImages === 3 && <div className="">
                    <Image
                        key={currentIndex + 2}
                        src={currentIndex + 2 > length ? TRANSPARENT_URL : `/${src}/${currentIndex + 2}.jpg`}
                        height={currentIndex + 2 > length ? 1 : IMG_HEIGHT}
                        width={currentIndex + 2 > length ? 1 : IMG_WIDTH}
                        className="aspect-3/2 object-cover"
                        alt=""
                        placeholder={currentIndex + 1 > length ? TRANSPARENT_URL : PLACEHOLDER_URL}
                    />
                </div>}
                <div
                    className="w-fit cursor-pointer self-center text-2xl lg:text-4xl"
                    onClick={() =>
                        setCurrentIndex(() =>
                            currentIndex + numImages > length
                                ? 1
                                : currentIndex + numImages
                        )
                    }
                >
                    <IoIosArrowForward />
                </div>
            </div>
        </>
    );
}
