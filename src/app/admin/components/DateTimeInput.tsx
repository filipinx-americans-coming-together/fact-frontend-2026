export default function DateTimeInput({
    label,
    id,
    setState,
    required = true,
}: {
    label: string;
    id: string;
    setState(state: Object): void;
    required?: boolean;
}) {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    return (
        <div className="flex flex-col">
            <label htmlFor={id}>
                {label} <span className="text-red-600">*</span>
            </label>
            <input
                id={id}
                className="py-1 px-2 rounded-sm border w-full min-w-48"
                type="datetime-local"
                required={required}
                onChange={(event) => {
                    const value = event.currentTarget.value;

                    setState((prevState: Object) => ({
                        ...prevState,
                        [id]: value,
                    }));
                }}
            />
            <p className="text-xs text-right text-gray-500">{timeZone} Time</p>
        </div>
    );
}
