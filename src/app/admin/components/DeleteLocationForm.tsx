import { useState } from "react";
import { useDeleteLocation } from "../hooks/useDeleteLocation";
import FormContainer from "./FormContainer";
import { LocationData } from "@/util/types";
import SearchableSelect from "@/components/ui/SearchableSelect";

interface NumberObject {
    id: number;
}

export default function DeleteLocationForm({
    locations,
}: {
    locations: LocationData[] | undefined;
}) {
    const {
        deleteLocation,
        error: deleteError,
        isPending: deletePending,
    } = useDeleteLocation();
    const [deleteLocationId, setDeleteLocationId] = useState<Object>({
        id: undefined,
    });

    if (locations === undefined || locations.length === 0) {
        return <></>;
    }

    return (
        <FormContainer
            formName="deleteLocationItem"
            submitText="Delete"
            onSubmit={() => {
                let confirmation = confirm("Are you sure you want to delete this location?")
                if (confirmation) deleteLocation({ id: (deleteLocationId as NumberObject).id })
            }}
            isLoading={deletePending}
            errorMessage={deleteError?.message}
        >
            <SearchableSelect
                label=""
                id="id"
                setState={setDeleteLocationId}
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
        </FormContainer>
    );
}
