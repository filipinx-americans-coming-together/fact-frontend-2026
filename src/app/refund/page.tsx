import Navbar from "@/components/navigation/Navbar";

export default function Refund() {
    return (
        <>
            <div className="h-screen">
				<Navbar />
                <div className="flex flex-row flex-wrap justify-center">
                    <div className="w-5/6 md:w-1/2 scroll-p-[50%] h-[85vh]"> 
                        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfJKkUaErvvX76T__wd4Bdr7KUXAEZUcPQiLukB4jGkCr4C_Q/viewform?embedded=true" height="100%" width="100%"></iframe>
                    </div>
                </div>
            </div>
        </>
    );
}

// m-b-[-300px] lg:m-b-0