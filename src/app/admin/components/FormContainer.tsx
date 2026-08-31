import LoadingCircle from "@/components/icons/LoadingCircle";
import { EventHandler, ReactNode } from "react";
import Button from "./Button";

interface FormProps {
    children: ReactNode;
    onSubmit: EventHandler<any>;
    formName: string;
    submitText: string;
    isLoading: boolean;
    errorMessage: string | undefined | null;
}

export default function FormContainer(props: FormProps) {
    return (
        <form
            name={props.formName}
            className="flex flex-col gap-4 text-left"
            autoComplete="off"
            onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit(event);
            }}
        >
            {props.children}
            {props.errorMessage && (
                <p className="text-red-600">{props.errorMessage}</p>
            )}
            <div className="w-fit self-end text-sm">
                {props.isLoading ? (
                    // loading
                    <div className="flex justify-center py-2">
                        <LoadingCircle />
                    </div>
                ) : (
                    // submit
                    <Button
                        text={props.submitText}
                        onClick={() => {}}
                        isSubmit={true}
                    />
                )}
            </div>
        </form>
    );
}
