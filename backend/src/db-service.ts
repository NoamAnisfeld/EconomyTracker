import { MongoClient } from 'mongodb';
import { TransactionCreationInfo, transactionCreationInfoSchema } from './schemas.js';

const { DB_URL, DB_NAME } = process.env;
if (!DB_URL) {
    throw new Error('DB_URL is not set');
}
if (!DB_NAME) {
    throw new Error('DB_NAME is not set');
}
const _db = new MongoClient(DB_URL).db(DB_NAME);

export async function getUsers() {
    return _db.collection('users').find().toArray();
}

export async function getCategories() {
    const categories = await _db.collection('categories').find().toArray();
    return categories;
}

export async function getSubcategories(categoryId?: string) {

    const collection = _db.collection('subcategories');
    const results = await (categoryId
        ? collection.find({ category_id: categoryId })
        : collection.find()
    ).toArray();
    return results;
}

export async function getTransactions() {
    return _db.collection('transactions').find().toArray();
}

export async function createTransaction(transactionInfo: TransactionCreationInfo) {

    const { error, data } = transactionCreationInfoSchema.safeParse(transactionInfo);
    if (error) {
        throw new Error(error.message);
    }

    const { subcategory_id, amount, type, date } = data;
    return _db.collection('transactions').insertOne({ subcategory_id, amount, type, date });
}