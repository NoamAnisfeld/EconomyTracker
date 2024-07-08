import { type Category, categorySchema, type Subcategory, subcategorySchema, TransactionCreationInfo, transactionSchema } from "./schemas";
import { apiUrl, fetchJson, postJson } from "./utils";

export async function fetchCategories(): Promise<Category[]> {
    const json = await fetchJson(apiUrl('categories'));
    const categories = categorySchema.array().parse(json);
    return categories;
}

export async function fetchSubcategories(categoryId?: string): Promise<Subcategory[]> {

    if (categoryId) {
        const json = await fetchJson(apiUrl(`categories/${categoryId}/subcategories`));
        const subcategories = subcategorySchema.array().parse(json);
        return subcategories;
    } else {
        const json = await fetchJson(apiUrl('subcategories'));
        const subcategories = subcategorySchema.array().parse(json);
        return subcategories;
    }
}

export async function fetchTransactions() {
    const json = await fetchJson(apiUrl('transactions'));
    const transactions = transactionSchema.array().parse(json);
    return transactions;
}

export async function addTransaction(transactionCreationInfo: TransactionCreationInfo) {
    return await postJson(apiUrl('transactions'), transactionCreationInfo);
}