import { ReactNode, useEffect } from "react";

interface SelectProps {
    children: ReactNode;
    id: string;
    label: string;
    setState: (state: Object) => void;
    defaultValue?: string;
    required?: boolean;
}

/**
 * Select menu
 * @param id html id
 * @param label label text
 * @param setState function to call on input change
 * @param defaultValue default value id
 * @param required is required
 * @param children options
 * @returns
 */
function Select<T>({
    id,
    label,
    setState,
    defaultValue,
    required = true,
    children,
}: SelectProps) {
    useEffect(() => {
        setState((prevState: Object) => ({
            ...prevState,
            [id]: defaultValue,
        }));
    }, [defaultValue, id, setState]);

    return (
        <div className="flex flex-col w-full">
            {/* label */}
            <label htmlFor={id}>
                {label} {required && <span className="text-red-600">*</span>}
            </label>

            <select
                className="min-h-[34px] py-1 px-2 rounded-sm border border-slate-700 bg-[rgba(250,250,250,0.3)] shadow-lg"
                id={id}
                defaultValue={defaultValue ? defaultValue : undefined}
                onChange={(event) => {
                    const value = event.currentTarget.value;
                    setState((prevState: Object) => ({
                        ...prevState,
                        [id]: value,
                    }));
                }}
            >
                {children}
            </select>
        </div>
    );
}

export default Select;
