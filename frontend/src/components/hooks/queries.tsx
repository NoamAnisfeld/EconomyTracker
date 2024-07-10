import { fetchCategories, fetchSubcategories, fetchTransactions } from "@/requests";
import type { Category, Subcategory, TransactionType } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useFetchCategories(transactionType?: TransactionType) {
    return useQuery({
        queryFn: fetchCategories,
        queryKey: ['categories'],
        select: (categories) => 
            transactionType ? categories.filter(category => category.type === transactionType) : categories,
        initialData: [],
    });
}

export function useFetchSubcategories() {
    return useQuery({
        queryFn: () => fetchSubcategories(),
        queryKey: ['subcategories'],
        initialData: [],
    });
}

export function useFetchTransactions() {
    return useQuery({
        queryFn: () => fetchTransactions(),
        queryKey: ['transactions'],
        initialData: [],
    });
}

export function useFetchCategoryNames(transactionType?: TransactionType) {

    function filterFn(categories: Category[]) {
        return transactionType ? categories.filter(category => category.type === transactionType) : categories
    }
    function transformerFn(categories: Category[]) {
        return categories.reduce((acc, category) => {
            acc[category._id] = category.name;
            return acc;
        }, {} as Record<string, string>)
    }

    return useQuery({
        queryFn: fetchCategories,
        select: data => transformerFn(filterFn(data)),
        queryKey: ['categories'],
        initialData: [],
    });
}

export function useFetchSubcategoryNames() {
    function transformerFn(subcategories: Subcategory[]) {
        return subcategories.reduce((acc, subcategory) => {
            acc[subcategory._id] = subcategory.name;
            return acc;
        }, {} as Record<string, string>)
    }

    return useQuery({
        queryFn: () => fetchSubcategories(),
        select: transformerFn,
        queryKey: ['subcategories'],
        initialData: [],
    });
}

export function useFetchSubcategoryMapping() {
    function transformerFn(subcategories: Subcategory[]) {
        return subcategories.reduce((acc, subcategory) => {
            acc[subcategory._id] = subcategory.category_id;
            return acc;
        }, {} as Record<string, string>)
    }

    return useQuery({
        queryFn: () => fetchSubcategories(),
        select: transformerFn,
        queryKey: ['subcategories'],
        initialData: [],
    });
}