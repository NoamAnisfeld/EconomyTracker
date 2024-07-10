import { Button as UiButton, type ButtonProps as UiButtonProps } from "@/components/ui/button"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState, type FormEventHandler } from "react"
import { Category, Subcategory, type TransactionType } from '@/schemas';
import { useFetchCategories } from "./hooks/queries"
import { addTransaction, fetchSubcategories } from "@/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { cn } from "@/tailwind/utils";

function Button({ children, className, ...props }: UiButtonProps) {
    return (
        <UiButton
            {...props}
            className={cn("w-20 h-20 p-4 text-wrap", className)}
        >
            {children}
        </UiButton>
    )
}

export default function AddTransactionForm({ reset }: { reset: () => void }) {

    const [amount, setAmount] = useState(0);
    const [month, setMonth] = useState((new Date).getMonth() + 1);
    const [year, setYear] = useState((new Date).getFullYear());
    const [transactionType, setTransactionType] = useState<TransactionType | undefined>();
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');

    const queryClient = useQueryClient();
    const { data: categories } = useFetchCategories(transactionType);
    const { data: subcategories } = useQuery({
        queryFn: () => fetchSubcategories(categoryId),
        queryKey: ['categories', categoryId, 'subcategories'],
        initialData: [],
        enabled: Boolean(categoryId),
    });
    const addTransactionMutation = useMutation({
        mutationFn: addTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            reset();
        }
    })

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!transactionType || !amount || !subcategoryId) return;

        addTransactionMutation.mutate({
            subcategory_id: subcategoryId,
            amount,
            type: transactionType,
            date: new Date(year, month - 1).valueOf(),
        })
    }

    return (
        <form onSubmit={handleSubmit} className="w-[500px]">
            <Card className="w-full">
                <CardContent className="grid p-4 gap-4">
                    <div className="flex gap-4">
                        <InputAmount value={amount} onChange={setAmount} />
                        <SelectMonth month={month} year={year} onSelected={setMonth} />
                        <SelectYear year={year} onSelected={setYear} />
                    </div>
                    {!transactionType
                        ? <SelectIncomeOrExpense
                            onSelected={setTransactionType}
                        />
                        : !categoryId
                            ? <SelectCategory
                                categories={categories}
                                onSelected={setCategoryId}
                                onBack={() => setTransactionType(undefined)}
                            />
                            : <SelectSubcategory
                                subcategories={subcategories}
                                onSelected={setSubcategoryId}
                                onBack={() => setCategoryId('')}
                            />
                    }
                </CardContent>
            </Card>
        </form>
    )
}

function InputAmount({
    value,
    onChange,
}: {
    value: number,
    onChange: (value: number) => void,
}) {
    return <Input
        type="number"
        required
        min={0}
        max={1000000000}
        value={value || ''}
        placeholder="סכום"
        onChange={e => onChange(Number(e.target.value))}
    />
}

function SelectMonth({
    month,
    year,
    onSelected,
}: {
    month: number,
    year: number,
    onSelected: (value: number) => void,
}) {
    const monthNames = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

    return (
        <select required onChange={e => onSelected(Number(e.target.value))}>
            {monthNames.map((monthName, i) =>
                <option
                    key={i + 1}
                    value={i + 1}
                    selected={month === i + 1}
                    disabled={year === new Date().getFullYear() && i > new Date().getMonth()}
                >
                    {monthName}
                </option>
            )}
        </select>
    )
}

function SelectYear({
    year,
    onSelected,
}: {
    year: number,
    onSelected: (value: number) => void,
}) {
    return (
        <select required onChange={e => onSelected(Number(e.target.value))}>
            {[...Array(10)].map((_, i) =>
                <option
                    key={i}
                    value={new Date().getFullYear() - i}
                    selected={year === new Date().getFullYear() - i}
                >
                    {new Date().getFullYear() - i}
                </option>
            )}
        </select>
    )
}

function SelectIncomeOrExpense({
    onSelected,
}: {
    onSelected: (value: TransactionType | undefined) => void,
}) {
    return (<>
        <div className="flex flex-wrap m-auto gap-4">
            <Button onClick={() => onSelected('income')}>הוספת הכנסה</Button>
            <Button onClick={() => onSelected('expense')}>הוספת הוצאה</Button>
        </div>
    </>)
}

function SelectCategory({
    categories,
    onSelected,
    onBack,
}: {
    categories: Category[],
    onSelected: (categoryId: string) => void,
    onBack: () => void,
}) {
    return (<>
        <BackButton onClick={onBack} />
        <div className="flex flex-wrap m-auto gap-4">
            {categories.map(category => (
                <Button
                    key={category._id}
                    onClick={() => onSelected(category._id)}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    </>)
}

function SelectSubcategory({
    subcategories,
    onSelected,
    onBack,
}: {
    subcategories: Subcategory[],
    onSelected: (categoryId: string) => void,
    onBack: () => void,
}) {
    return (<>
        <BackButton onClick={onBack} />
        <div className="flex flex-wrap m-auto gap-4">
            {subcategories.map(subcategory => (
                <Button
                    key={subcategory._id}
                    onClick={() => onSelected(subcategory._id)}
                >
                    {subcategory.name}
                </Button>
            ))}
        </div>
    </>)
}

function BackButton({
    onClick,
}: {
    onClick: () => void,
}) {
    return (<div>
        <UiButton onClick={onClick} variant="outline">
            {"<= חזרה"}
        </UiButton>
    </div>)
}