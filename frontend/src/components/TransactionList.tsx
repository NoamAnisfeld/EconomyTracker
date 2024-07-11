import { useFetchCategoryNames, useFetchSubcategoryMapping, useFetchSubcategoryNames, useFetchTransactions } from "./hooks/queries";

type PresentableTransactionInfo = {
    _id: string,
    category: string,
    subcategory: string,
    amount: number,
    month: number,
    year: number,
}
function usePresentableTransactionInfo(): PresentableTransactionInfo[] {

    const { data: categories } = useFetchCategoryNames();
    const { data: subcategories } = useFetchSubcategoryNames();
    const { data: subcategoryMapping } = useFetchSubcategoryMapping();
    const { data: transactions } = useFetchTransactions();

    return transactions.map(transaction => ({
        _id: transaction._id,
        category: categories[subcategoryMapping[transaction.subcategory_id]],
        subcategory: subcategories[transaction.subcategory_id],
        amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
        month: transaction.month,
        year: transaction.year,
    }))
}

const tableHeadersAndContent: [string, (info: PresentableTransactionInfo) => React.ReactNode][] = [
    ['קטגוריה', info => info.category],
    ['תת קטגוריה', info => info.subcategory],
    ['סכום', info => <span dir="ltr">{info.amount}</span>],
    ['חודש', info => info.month],
    ['שנה', info => info.year],
]

export default function TransactionList() {

    const transactions = usePresentableTransactionInfo();

    return (
        <table className="my-4 p-2 w-full">
            <thead>
                <tr className="bg-gray-300">
                    {tableHeadersAndContent.map(([header]) =>
                        <th className="p-2 text-start" key={header}>{header}</th>)}
                </tr>
            </thead>
            <tbody>{
                transactions.reverse().map((transaction) =>
                    <tr key={transaction._id} className={transaction.amount > 0 ? 'bg-green-500' : 'bg-red-500'}>
                        {tableHeadersAndContent.map(([header, content]) =>
                            <td
                                className="p-2"
                                key={header}
                            >
                                {content(transaction)}
                            </td>
                        )}
                    </tr>
                )
            }</tbody>
            <tfoot>
                <tr className="bg-gray-300">
                    <th colSpan={2} className="p-2 text-start">מאזן</th>
                    <td colSpan={3} className="p-2">
                        <span dir="ltr">
                            {transactions.reduce((acc, transaction) => acc + transaction.amount, 0)}
                        </span>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}