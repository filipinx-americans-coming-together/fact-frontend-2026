import FormContainer from "./FormContainer";
import { LocationData } from "@/util/types";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { useUpdateLocation } from "../hooks/useUpdateLocation";
import { useState } from "react";
import SearchableSelect from "@/components/ui/SearchableSelect";

// select values are strings, location ids are numbers
function getLocationByID(
    locations: LocationData[],
    id: number | string | undefined
) {
    return locations.find((loc) => loc.id === Number(id));
}

export default function UpdateLocationForm({
    locations,
}: {
    locations: LocationData[] | undefined;
}) {
    const {
        updateLocation,
        error: updateError,
        isPending: updatePending,
    } = useUpdateLocation();
    const [updateLocationData, setUpdateLocationData] = useState<{
        [key: string]: any;
    }>({});
    const [clientError, setClientError] = useState<string>();

    if (locations === undefined || locations.length === 0) {
        return <></>;
    }

    return (
        <FormContainer
            formName="updateLocationItem"
            submitText="Update"
            onSubmit={() => {
                const selected = getLocationByID(
                    locations,
                    updateLocationData.id
                );

                if (!selected) {
                    setClientError("Select a location to update");
                    return;
                }

                // blank fields keep the location's current values
                const capacity = updateLocationData.capacity?.trim()
                    ? Number(updateLocationData.capacity)
                    : selected.capacity;

                if (!Number.isInteger(capacity) || capacity < 0) {
                    setClientError("Capacity must be a whole number");
                    return;
                }

                setClientError(undefined);

                let confirmation = confirm("Are you sure you want to update this location?")
                if (confirmation)
                    updateLocation({
                        id: selected.id,
                        building:
                            updateLocationData.building?.trim() ||
                            selected.building,
                        room_num:
                            updateLocationData.room_num?.trim() ||
                            selected.room_num,
                        capacity: capacity,
                        session: updateLocationData.session
                            ? Number(updateLocationData.session)
                            : selected.session,
                    });
            }}
            isLoading={updatePending}
            errorMessage={clientError ?? updateError?.message}
        >
            <SearchableSelect
                label=""
                id="id"
                setState={setUpdateLocationData}
                required={false}
                placeholder="Select Location..."
                defaultValue={
                    locations.length > 0
                        ? locations[0].id.toString()
                        : undefined
                }
                options={locations.map((locationItem, index) => {
                    return {
                        label: `${locationItem.building} ${locationItem.room_num}
                             - Session 
                            ${locationItem.session}
                             (Capacity: 
                            ${locationItem.capacity})`,
                        value: locationItem.id.toString(),
                    };
                })}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <TextInput
                        label="Building"
                        id="building"
                        setState={setUpdateLocationData}
                        required={false}
                        placeholder={
                            getLocationByID(
                                locations,
                                updateLocationData.id
                            )?.building
                        }
                    />
                    <TextInput
                        label="Room"
                        id="room_num"
                        setState={setUpdateLocationData}
                        required={false}
                        placeholder={
                            getLocationByID(
                                locations,
                                updateLocationData.id
                            )?.room_num
                        }
                    />
                    <TextInput
                        label="Capacity"
                        id="capacity"
                        setState={setUpdateLocationData}
                        required={false}
                        placeholder={getLocationByID(
                            locations,
                            updateLocationData.id
                        )?.capacity.toString()}
                    />
                    <Select
                        label="Session"
                        id="session"
                        setState={setUpdateLocationData}
                        required={false}
                        defaultValue={undefined}
                    >
                        <option value="">Unchanged</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </Select>
                </div>
        </FormContainer>
    );
}
