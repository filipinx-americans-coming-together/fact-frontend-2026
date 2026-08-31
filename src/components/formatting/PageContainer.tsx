import { ReactNode } from "react";
import PageHeader from "./PageHeader";
import Navbar from "../navigation/Navbar";
import Footer from "./PageFooter";

interface PageContainerProps {
    children: ReactNode;
    title: string;
    background?: string;
    maintainCase?: boolean;
}

/**
 * Formatting container for website pages
 * @param children page content
 * @returns PageContainer
 */
export default function PageContainer({ children, title, background="bg-gradient mask-(--background-image-blurry-1) mask-size-[1400px] mask-top", maintainCase=false }: PageContainerProps) {
    return (
        <div className="h-fit w-full relative">
            <Navbar />
            
            <div className="relative">
                <div className={`-z-10 absolute inset-0 w-full ${background}`}></div>
                <div className="mx-auto max-w-6xl xl:max-w-[1600px] px-4 lg:px-8 py-10">
                    <div className="text-center pb-10 sm:p-10 border-b-2 mb-6 lg:mb-10">
                        <div className={`font-bold text-5xl lg:text-6xl ${maintainCase ? "" : "uppercase"}`}>
                            {title}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
}
