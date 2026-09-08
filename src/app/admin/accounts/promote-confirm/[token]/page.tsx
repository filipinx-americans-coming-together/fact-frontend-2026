"use client";

import LoadingCircle from "@/components/icons/LoadingCircle";
import RegPageContainer from "@/components/formatting/RegPageContainer";
import { useConfirmAdminPromotion } from "@/hooks/api/useConfirmAdminPromotion";

export default function PromoteConfirm({
    params,
}: {
    params: { token: string };
}) {
    const token = params.token;
    const { confirmPromotion, isPending, isSuccess, error } =
        useConfirmAdminPromotion();

    return (
        <RegPageContainer pageTitle="FACT Admin Access">
            <div className="flex flex-col items-center gap-4 text-center max-w-md mx-auto">
                {isSuccess ? (
                    <p className="text-green-700 font-semibold">
                        Admin access granted. You can log in at{" "}
                        <a href="/admin/login" className="underline">
                            /admin/login
                        </a>
                        .
                    </p>
                ) : (
                    <>
                        <p>
                            Someone at FACT has requested that your account be
                            given admin access. Nothing has changed yet —
                            click below to accept.
                        </p>

                        {isPending ? (
                            <LoadingCircle />
                        ) : (
                            <button
                                onClick={() => confirmPromotion(token)}
                                className="pill pill--ink"
                            >
                                Accept Admin Access
                            </button>
                        )}

                        {error && (
                            <p className="text-red-600">{error.message}</p>
                        )}
                    </>
                )}
            </div>
        </RegPageContainer>
    );
}
