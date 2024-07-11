import type { Application, RequestHandler } from "express";
import { HttpCodes as HTTP, apiPath } from "./utils.js";
import {
    getUsers,
    getCategories,
    getSubcategories,
    getTransactions,
    createTransaction,
    deleteTransaction
} from "./db-service.js";

export function router(app: Application) {
    app.get('/', rootRoute);
    app.get(apiPath('users'), getUsersRoute);
    app.get(apiPath('categories'), getCategoriesRoute);
    app.get(apiPath('subcategories'), getSubcategoriesRoute);
    app.get(apiPath('categories/:categoryId/subcategories'), getSubcategoriesByCategoryIdRoute);
    app.get(apiPath('transactions'), getTransactionsRoute);

    app.post(apiPath('transactions'), createTransactionRoute);
    
    app.delete(apiPath('transactions/:transactionId'), deleteTransactionRoute);

}

const getUsersRoute: RequestHandler = async (_req, res) => {
    res.send(await getUsers());
}

const getCategoriesRoute: RequestHandler = async (_req, res) => {
    res.send(await getCategories());
}

const getSubcategoriesRoute: RequestHandler = async (_req, res) => {
    res.send(await getSubcategories());
}

const getSubcategoriesByCategoryIdRoute: RequestHandler = async (req, res) => {
    res.send(await getSubcategories(req.params.categoryId));
}

const getTransactionsRoute: RequestHandler = async (_req, res) => {
    res.send(await getTransactions());
}

const createTransactionRoute: RequestHandler = async (req, res) => {
    res.send(await createTransaction(req.body));
}

const deleteTransactionRoute: RequestHandler = async (req, res) => {
    res.send(await deleteTransaction(req.params.transactionId));
}

const rootRoute: RequestHandler = (_req, res) => {
    res.send('root page');
}
