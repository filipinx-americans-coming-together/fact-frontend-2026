import Navbar from "../navigation/Navbar";

export default function ForbiddenPage() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-slate-50 text-black">
                <div className="w-9/12 mx-auto text-center">
                    <br />

                    <p>
                        You are not permitted to view this page. If you think
                        this is a mistake, please try logging in again.
                    </p>
                </div>
            </div>
        </>
    );
}
