import { Category, Subcategory } from "@/schemas";
import { Label } from "./ui/label";

interface CategorySelectProps {
    elementId: string,
    label: string,
    categories: Category[] | Subcategory[],
    onSelected: (categoryId: string) => void,
}

export default function CategorySelect({
    elementId,
    label,
    categories,
    onSelected,
}: CategorySelectProps) {
    return (<div className="w-full flex gap-4 items-center justify-stretch">
        <Label htmlFor={elementId} className="text-nowrap w-1/4">{label}</Label>
        <select
            className="w-full"
            id={elementId}
            disabled={!categories.length}
            required
            onChange={e => onSelected(e.target.value)}
        >
            <option value="">
                {categories.length
                    ? "-- יש לבחור --"
                    : "בהמתנה..."
                }
            </option>
            {categories.map(category =>
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            )}
        </select>
    </div>)
}