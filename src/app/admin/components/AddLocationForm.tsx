import FormContainer from "./FormContainer";
import { useCreateLocation } from "../hooks/useCreateLocation";
import { useState } from "react";
import TextInput from "@/components/ui/TextInput";
import Select from "@/components/ui/Select";

export default function AddLocationForm() {
    const {
        createLocation,
        error: createError,
        isPending: createPending,
    } = useCreateLocation();
    const [addLocationData, setAddLocationData] = useState<{
        [key: string]: any;
    }>({
        room_num: "",
        building: "",
        capacity: "",
        session: "1",
    });
    const [clientError, setClientError] = useState<string>();

    return (
        <FormContainer
            formName="newLocationItem"
            submitText="Add"
            onSubmit={() => {
                const capacity = Number(addLocationData.capacity);

                if (!Number.isInteger(capacity) || capacity < 0) {
                    setClientError("Capacity must be a whole number");
                    return;
                }

                setClientError(undefined);
                createLocation({
                    building: addLocationData.building.trim(),
                    room_num: addLocationData.room_num.trim(),
                    capacity: capacity,
                    session: Number(addLocationData.session),
                });
            }}
            isLoading={createPending}
            errorMessage={clientError ?? createError?.message}
        >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 text-left">
                <TextInput
                    label="Building"
                    id="building"
                    setState={setAddLocationData}
                    required={true}
                />
                <TextInput
                    label="Room"
                    id="room_num"
                    setState={setAddLocationData}
                    required={true}
                />
                <TextInput
                    label="Capacity"
                    id="capacity"
                    setState={setAddLocationData}
                    required={true}
                />
                <Select
                    label="Session"
                    id="session"
                    setState={setAddLocationData}
                    required={true}
                    defaultValue={"1"}
                >
                    <option value={"1"}>1</option>
                    <option value={"2"}>2</option>
                    <option value={"3"}>3</option>
                </Select>
            </div>
        </FormContainer>
    );
}
