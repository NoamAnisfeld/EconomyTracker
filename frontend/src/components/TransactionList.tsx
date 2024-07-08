import { useFetchCategoryNames, useFetchSubcategoryMapping, useFetchSubcategoryNames, useFetchTransactions } from "./hooks/queries";

type PresentableTransactionInfo = {
    _id: string,
    category: string,
    subcategory: string,
    amount: number,
    date: string,
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
        date: new Date(transaction.date).toLocaleDateString(),
    }))
}

const tableHeadersAndProperties: [string, keyof PresentableTransactionInfo][] = [
    ['קטגוריה', 'category'],
    ['תת קטגוריה', 'subcategory'],
    ['סכום', 'amount'],
    ['תאריך', 'date'],
]

export default function TransactionList() {

    const transactions = usePresentableTransactionInfo();

    return (
        <table className="my-4 p-2 w-full">
            <thead>
                <tr className="bg-gray-300">
                    {tableHeadersAndProperties.map(([header, property]) =>
                        <th className="p-2 text-start" key={property}>{header}</th>
                    )}
                </tr>
            </thead>
            <tbody>{
                transactions.reverse().map((transaction) =>
                    <tr key={transaction._id}>
                        {tableHeadersAndProperties.map(([, property]) =>
                            <td
                                className="p-2"
                                key={property}
                            >
                                {property === 'amount'
                                    ? <span dir="ltr">{transaction[property]}</span>
                                    : transaction[property]
                                }
                            </td>
                        )}
                    </tr>
                )
            }</tbody>
            <tfoot>
                <tr className="bg-gray-300">
                    <th colSpan={2} className="p-2 text-start">מאזן</th>
                    <td colSpan={2} className="p-2">{transactions.reduce((acc, transaction) => acc + transaction.amount, 0)}</td>
                </tr>
            </tfoot>
        </table>
    )
}