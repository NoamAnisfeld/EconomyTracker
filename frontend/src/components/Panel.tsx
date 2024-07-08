import { useState } from "react";
import AddTransactionForm from "./AddTransactionForm";
import TransactionList from "./TransactionList";

export default function Panel() {
    
    const [formResetKey, setFormResetKey] = useState(0);

    return (<>
        <AddTransactionForm key={formResetKey} reset={() => setFormResetKey(formResetKey + 1)} />
        <TransactionList />
    </>);
}
