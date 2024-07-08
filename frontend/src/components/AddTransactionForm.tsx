import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, type FormEventHandler } from "react"
import { type TransactionType } from '@/schemas';
import CategorySelect from "./CategorySelect"
import { useFetchCategories } from "./hooks/queries"
import { addTransaction, fetchSubcategories } from "@/requests"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Calendar } from "./ui/calendar"

export default function AddTransactionForm({ reset }: { reset: () => void }) {

    const [transactionType, setTransactionType] = useState<TransactionType>('income');
    const [amount, setAmount] = useState(0);
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryId, setSubcategoryId] = useState('');
    const [date, setDate] = useState(new Date());
    const isDataValid = Boolean(amount && categoryId && subcategoryId);

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
            <Card className="w-full mx-auto">
                <CardContent className="grid p-4 gap-4">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <span>{"הוספת "}</span>
                                <select
                                    autoFocus
                                    value={transactionType}
                                    onChange={e => setTransactionType(e.target.value)}
                                >
                                    <option value="income">הכנסה</option>
                                    <option value="expense">הוצאה</option>
                                </select>
                                <Label>בסך</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={0}
                                    max={1000000000}
                                    required
                                    value={amount}
                                    onChange={e => setAmount(Number(e.target.value))}
                                />
                                ש"ח
                            </div>
                            <div>
                                <CategorySelect
                                    elementId="category"
                                    label="קטגוריה"
                                    categories={categories}
                                    onSelected={setCategoryId}
                                />
                            </div>
                            <div>
                                <CategorySelect
                                    elementId="subcategory"
                                    label="תת קטגוריה"
                                    categories={subcategories}
                                    onSelected={setSubcategoryId}
                                />
                            </div>
                        </div>
                        <Calendar
                            mode="single"
                            required
                            disabled={date => date > new Date()}
                            selected={date}
                            onSelect={date => date && setDate(date)}
                            className="rounded-md border"
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={!isDataValid}>הוספה</Button>
                </CardFooter>
            </Card>
        </form>
    )
}