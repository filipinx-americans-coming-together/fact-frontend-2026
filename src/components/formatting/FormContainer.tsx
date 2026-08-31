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
                        <p className="text-red-600 text-center">{props.errorMessage}</p>
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

                    <p className="text-xs text-slate-700">
                        This site uses cookies to perform necessary actions. If you
                        are on a mobile device, please disable &quot;Prevent Cross-Site
                        Tracking&quot; before continuing
                    </p>
                </form>
            </div>
        </div>
    );
}

export default FormContainer;
