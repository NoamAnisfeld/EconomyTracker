import { TransactionType } from "@/schemas";
import SelectingButton from "./SelectingButton";


export function SelectIncomeOrExpense({
    onSelected,
}: {
    onSelected: (value: TransactionType | undefined) => void;
}) {
    return (<>
        <div className="flex flex-wrap m-auto gap-4">
            <SelectingButton onClick={() => onSelected('income')}>הוספת הכנסה</SelectingButton>
            <SelectingButton onClick={() => onSelected('expense')}>הוספת הוצאה</SelectingButton>
        </div>
    </>);
}
