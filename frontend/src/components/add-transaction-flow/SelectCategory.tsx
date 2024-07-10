import { Category } from "@/schemas";
import SelectingButton from "./SelectingButton";
import { BackButton } from "./BackButton";


export function SelectCategory({
    categories, onSelected, onBack,
}: {
    categories: Category[];
    onSelected: (categoryId: string) => void;
    onBack: () => void;
}) {
    return (<>
        <BackButton onClick={onBack} />
        <div className="flex flex-wrap m-auto gap-4">
            {categories.map(category => (
                <SelectingButton
                    key={category._id}
                    onClick={() => onSelected(category._id)}
                >
                    {category.name}
                </SelectingButton>
            ))}
        </div>
    </>);
}
