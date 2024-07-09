import { fetchCategories, fetchSubcategories, fetchTransactions } from "@/requests";
import { Category, Subcategory } from "@/schemas";
import { useQuery } from "@tanstack/react-query";

export function useFetchCategories() {
    return useQuery({
        queryFn: fetchCategories,
        queryKey: ['categories'],
        placeholderData: [],
    });
}

export function useFetchSubcategories() {
    return useQuery({
        queryFn: () => fetchSubcategories(),
        queryKey: ['subcategories'],
        placeholderData: [],
    });
}

export function useFetchTransactions() {
    return useQuery({
        queryFn: () => fetchTransactions(),
        queryKey: ['transactions'],
        placeholderData: [],
    });
}

export function useFetchCategoryNames() {

    function transformerFn(categories: Category[]) {
        return categories.reduce((acc, category) => {
            acc[category._id] = category.name;
            return acc;
        }, {} as Record<string, string>)
    }

    return useQuery({
        queryFn: fetchCategories,
        select: transformerFn,
        queryKey: ['categories'],
        placeholderData: [],
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
        placeholderData: [],
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
        placeholderData: [],
    });
}