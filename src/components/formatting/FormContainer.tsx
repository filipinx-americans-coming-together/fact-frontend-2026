import { EventHandler, ReactNode } from "react";
import LoadingCircle from "../icons/LoadingCircle";
import InteractiveButton from "../ui/InteractiveButton";

interface FormProps {
    children: ReactNode;
    onSubmit: EventHandler<any>;
    formName: string;
    submitText: string;
    isLoading: boolean;
    errorMessage: string | undefined | null;
    /** Short code identifying which API call failed (see util/apiError.ts) — shown so a delegate can report it and we can trace it straight to the failing endpoint. */
    errorCode?: string;
}

function FormContainer(props: FormProps) {
    return ( // bg-[#FFAC7D]
        <div className="w-7/12 min-w-[460px] py-12 bg-[rgba(240,240,240,0.3)] m-auto rounded-lg">
            <div className="text-black m-auto flex flex-col items-center gap-3 ">
                <form
                    name={props.formName}
                    className="flex flex-col gap-4 lg:gap-6 items-center text-left w-3/4 md:w-5/6 lg:w-7/12"
                    autoComplete="off"
                    onSubmit={(event) => {
                        event.preventDefault();
                        props.onSubmit(event);
                    }}
                >
                    {props.children}
                    {props.errorMessage && (
                        <div className="text-red-600 text-center">
                            <p>{props.errorMessage}</p>
                            {props.errorCode && (
                                <p className="text-xs mt-1 text-[var(--ink-on-light-dim)]">
                                    Error code: <span className="font-mono">{props.errorCode}</span> — include this if you report the issue.
                                </p>
                            )}
                        </div>
                    )}

                    {props.isLoading ? (
                        // loading
                        <div className="flex justify-center py-2s">
                            <LoadingCircle />
                        </div>
                    ) : (
                        // submit
                        <div className={`my-4 lg:my-6`}>
                            <InteractiveButton
                                text={props.submitText}
                                onClick={() => {}}
                                isSubmit={true}
                            />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default FormContainer;
