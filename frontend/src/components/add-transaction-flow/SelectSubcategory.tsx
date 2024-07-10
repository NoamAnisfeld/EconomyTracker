import SelectingButton from "./SelectingButton";
import { BackButton } from "./BackButton";
import { Subcategory } from "@/schemas";

export function SelectSubcategory({
    subcategories, onSelected, onBack,
}: {
    subcategories: Subcategory[];
    onSelected: (categoryId: string) => void;
    onBack: () => void;
}) {
    return (<>
        <BackButton onClick={onBack} />
        <div className="flex flex-wrap m-auto gap-4">
            {subcategories.map(subcategory => (
                <SelectingButton
                    key={subcategory._id}
                    onClick={() => onSelected(subcategory._id)}
                >
                    {subcategory.name}
                </SelectingButton>
            ))}
        </div>
    </>);
}
