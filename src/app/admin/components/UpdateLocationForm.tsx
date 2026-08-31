import FormContainer from "./FormContainer";
import { LocationData } from "@/util/types";
import Select from "@/components/ui/Select";
import TextInput from "@/components/ui/TextInput";
import { useUpdateLocation } from "../hooks/useUpdateLocation";
import { useState } from "react";
import SearchableSelect from "@/components/ui/SearchableSelect";

function getLocationByID(locations: LocationData[], id: number) {
    return locations.find((loc) => loc.id === id);
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
    const [updateLocationData, setUpdateLocationData] = useState<Object>({
        id: undefined,
        room_num: undefined,
        building: undefined,
        capacity: undefined,
        session: undefined,
    });

    if (locations === undefined || locations.length === 0) {
        return <></>;
    }

    return (
        <FormContainer
            formName="updateLocationItem"
            submitText="Update"
            onSubmit={() => {
				let confirmation = confirm("Are you sure you want to update this location?")
                if (confirmation) updateLocation(updateLocationData as LocationData);
            }}
            isLoading={updatePending}
            errorMessage={updateError?.message}
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
                                (updateLocationData as LocationData).id
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
                                (updateLocationData as LocationData).id
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
                            (updateLocationData as LocationData).id
                        )?.capacity.toString()}
                    />
                    <Select
                        label="Session"
                        id="session"
                        setState={setUpdateLocationData}
                        required={false}
                        defaultValue={undefined}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </Select>
                </div>
        </FormContainer>
    );
}
