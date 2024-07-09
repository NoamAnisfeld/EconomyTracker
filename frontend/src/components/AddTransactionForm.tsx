import { Button as UiButton, type ButtonProps as UiButtonProps } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState, type FormEventHandler } from "react"
import { type TransactionType } from '@/schemas';
import { useFetchCategories } from "./hooks/queries"
import { addTransaction, fetchSubcategories } from "@/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Calendar } from "./ui/calendar"
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

    const [transactionType, setTransactionType] = useState<TransactionType | undefined>();
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
    const isDataValid = Boolean(transactionType && amount && categoryId && subcategoryId);

    const queryClient = useQueryClient();
    const { data: categories } = useFetchCategories();
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
        if (!isDataValid) return;

        addTransactionMutation.mutate({
            subcategory_id: subcategoryId,
            amount,
            type: transactionType,
            date: date.valueOf(),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <Card className="w-full">
                <CardContent className="grid p-4 gap-4">
                    <AddIncomeOrExpense
                        {...{
                            transactionType,
                            setTransactionType,
                            categories,
                            subcategories,
                            categoryId,
                            setCategoryId,
                            subcategoryId,
                            setSubcategoryId,
                            amount,
                            setAmount,
                            date,
                            setDate,
                        }}
                    />
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!isDataValid}>הוספה</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

function AddIncomeOrExpense({
    transactionType,
    setTransactionType,
    categories,
    subcategories,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
    amount,
    setAmount,
    date,
    setDate,
}) {
    if (transactionType) {
        return (
            <SelectCategory
                {...{
                    transactionType,
                    categories: categories.filter(category => category.type === transactionType),
                    subcategories,
                    categoryId,
                    setCategoryId,
                    subcategoryId,
                    setSubcategoryId,
                    amount,
                    setAmount,
                    date,
                    setDate,
                }}
            />
        )
    }

    return (
        <div className="flex justify-center gap-4">
            <Button onClick={() => setTransactionType('income')}>הוספת הכנסה</Button>
            <Button onClick={() => setTransactionType('expense')}>הוספת הוצאה</Button>
        </div>
    )
}

function SelectCategory({
    categories,
    subcategories,
    categoryId,
    setCategoryId,
    subcategoryId,
    setSubcategoryId,
    amount,
    setAmount,
    date,
    setDate,
}) {
    if (categoryId) {
        return (
            <SelectSubcategory
                {...{
                    subcategories,
                    subcategoryId,
                    setSubcategoryId,
                    amount,
                    setAmount,
                    date,
                    setDate,
                }}
            />
        )
    }

    return (<div className="flex gap-4">
        {categories.map(category => (
            <Button
                key={category._id}
                onClick={() => setCategoryId(category._id)}
            >
                {category.name}
            </Button>
        ))}
    </div>)
}

function SelectSubcategory({
    subcategories,
    subcategoryId,
    setSubcategoryId,
    amount,
    setAmount,
    date,
    setDate,
}) {
    if (subcategoryId) {
        return (
            <SelectAmountAndDate
                {...{
                    amount,
                    setAmount,
                    date,
                    setDate,
                }}
            />
        )
    }

    return (<div className="flex gap-4">
        {subcategories.map(subcategory => (
            <Button
                key={subcategory._id}
                onClick={() => setSubcategoryId(subcategory._id)}
            >
                {subcategory.name}
            </Button>
        ))}
    </div>)
}

function SelectAmountAndDate({ amount, setAmount, date, setDate }) {
    return (
        <div className="flex gap-4">
            <Input
                type="number"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                placeholder="סכום"
            />
            <Input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={e => setDate(new Date(e.target.value))}
            />
        </div>
    )
}