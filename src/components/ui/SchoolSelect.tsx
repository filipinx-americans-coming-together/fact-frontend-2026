import SearchableSelect from "./SearchableSelect";
import Select from "./Select";
import { useSchools } from "@/hooks/api/useSchools";

interface SchoolSelectProps {
    id: string;
    setState: (state: Object) => void;
    defaultValue?: string;
    required?: boolean;
}

/**
 * School selection menu
 * @param id for select for component
 * @param setState function to call on input change
 * @returns SchoolSelect component
 */
function SchoolSelect({
    id,
    setState,
    defaultValue,
    required = true,
}: SchoolSelectProps) {
    const { schools } = useSchools();
    const extraOptions: { label: string; value: string }[] = [
        { label: "N/A", value: "N/A" },
        { label: "School not listed", value: "School not listed" },
    ];

    return (
        schools &&
        schools.length > 0 && (
            <SearchableSelect
                id={id}
                label="School"
                setState={setState}
                defaultValue={defaultValue}
                required={required}
                options={extraOptions.concat(
                    schools.map((school) => {
                        return {
                            label: school.name,
                            value: school.id.toString(),
                        };
                    })
                )}
                placeholder="Search for schools..."
            />
        )
    );
}

export default SchoolSelect;
