import { ReactNode } from "react";
import PageHeader from "./PageHeader";
import Navbar from "../navigation/Navbar";
import Footer from "./PageFooter";

interface RegPageContainerProps {
    children: ReactNode;
    background?: string;
}

/**
 * Formatting container for website pages
 * @param children page content
 * @returns PageContainer
 */
export default function RegPageContainer({ children, background="bg-gradient mask-(--background-image-blurry-3) mask-size-[1400px] mask-top" }: RegPageContainerProps) {
    return (
        <div className={`h-fit w-screen relative`}>
            
            <div className="flex flex-col min-h-screen justify-between gap-10 lg:gap-15">
            <Navbar />
            {background && <div className={`-z-10 absolute inset-0 w-full grow ${background}`}></div>}
                {background && <div className="relative">
                        {children}
                </div>}
                {!background && <div>{children}</div>}
            <Footer />
            </div>
        </div>
    );
}