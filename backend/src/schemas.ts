import { z } from "zod";

export const entityWithIdSchema = z.object({
    id: z.string(),
})
export type EntityWithId = z.infer<typeof entityWithIdSchema>

export const transactionType = z.enum(['income', 'expense']);
export type TransactionType = z.infer<typeof transactionType>;

export const categorySchema = z.object({
    _id: z.string(),
    user_id: z.string(),
    name: z.string(),
    type: transactionType,
});
export type Category = z.infer<typeof categorySchema>;

export const subcategorySchema = z.object({
    _id: z.string(),
    category_id: z.string(),
    name: z.string(),
});
export type Subcategory = z.infer<typeof subcategorySchema>;

export const transactionSchema = z.object({
    _id: z.string(),
    subcategory_id: z.string(),
    amount: z.number(),
    type: transactionType,
    year: z.number(),
    month: z.number(),
});
export type Transaction = z.infer<typeof transactionSchema>;

export const categoryCreationInfoSchema = z.object({
    name: z.string(),
    type: transactionType,
});
export type CategoryCreationInfo = z.infer<typeof categoryCreationInfoSchema>;

export const subcategoryCreationInfoSchema = z.object({
    name: z.string(),
    category_id: z.string(),
});
export type SubcategoryCreationInfo = z.infer<typeof subcategoryCreationInfoSchema>;

export const transactionCreationInfoSchema = z.object({
    subcategory_id: z.string(),
    amount: z.number(),
    type: transactionType,
    year: z.number().int(),
    month: z.number().min(1).max(12),
});
export type TransactionCreationInfo = z.infer<typeof transactionCreationInfoSchema>;