import { useState, type FormEventHandler } from "react"
import type { TransactionType } from '@/schemas'
import { useFetchCategories } from "../hooks/queries"
import { addTransaction, fetchSubcategories } from "@/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { InputAmount } from "./InputAmount"
import { SelectCategory } from "./SelectCategory"
import { SelectIncomeOrExpense } from "./SelectIncomeOrExpense"
import { SelectMonth } from "./SelectMonth"
import { SelectSubcategory } from "./SelectSubcategory"
import { SelectYear } from "./SelectYear"

export default function AddTransactionForm({ reset }: { reset: () => void }) {

    const [amount, setAmount] = useState(0);
    // month is one-based (1-12)
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
            year,
            month,
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