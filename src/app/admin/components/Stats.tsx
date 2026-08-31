import { BsPeopleFill } from "react-icons/bs";
import { FaSchool } from "react-icons/fa6";
import RegistrationChart from "./charts/RegistrationChart";
import { useRegistrationSummary } from "../hooks/useRegistrationSummary";

export default function Stats() {
    const { summary } = useRegistrationSummary();

    if (!summary) {
        return <></>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="bg-linear-to-r from-lime-100 to-green-100 rounded-sm shadow-sm aspect-4/3 md:w-[240px] flex items-center justify-center">
                    <div className="flex flex-col gap-2">
                        <div className="text-4xl text-green-400">
                            <BsPeopleFill />
                        </div>
                        <p className="text-4xl font-bold">
                            {summary.delegates}
                        </p>
                        <p>Registered Delegates</p>
                    </div>
                </div>
                <div className="bg-linear-to-r from-cyan-100 to-blue-100 rounded-sm shadow-sm aspect-4/3 md:w-[240px] flex items-center justify-center">
                    <div className="flex flex-col gap-2">
                        <div className="text-4xl text-blue-400">
                            <FaSchool />
                        </div>
                        <p className="text-4xl font-bold">{summary.schools}</p>
                        <p>Unique Schools</p>
                    </div>
                </div>
            </div>
            <br />
            {/* TODO: display registrations including returning users */}
            {/* <RegistrationChart dates={summary.registrations} /> */}
        </>
    );
}
