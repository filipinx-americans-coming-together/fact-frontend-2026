export default function DangerZoneAction({
    title,
    permissionState,
    description,
    actionText,
    confirmText,
    changePermission,
}: {
    title: String;
    permissionState?: String;
    description: String;
    actionText: String;
    confirmText: String;
    changePermission: Function;
}) {
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
            <div className="md:col-span-4">
                <h2 className="font-bold">{actionText}</h2>
                <p className="text-sm">
                    {permissionState && (
                        <>
                            {title} is currently{" "}
                            {
                                <span className="text-red-600">
                                    {permissionState}
                                </span>
                            }
                            .{" "}
                        </>
                    )}
                    {description}
                </p>
            </div>
            <div className="text-center md:col-span-2">
                <button
                    className="shadow text-sm text-red-600 px-8 py-2 bg-gray-300 hover:bg-gray-200 rounded-sm"
                    type="button"
                    onClick={() => {
                        let confirmation = confirm(
                            `Are you sure you want to ${confirmText}? The result of this action will be applied immediately.`
                        );

                        if (confirmation) changePermission();
                    }}
                >
                    {actionText}
                </button>
            </div>
        </div>
    );
}
