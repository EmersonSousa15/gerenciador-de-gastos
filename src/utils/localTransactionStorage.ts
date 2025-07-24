import { Transaction } from "../types/Transaction";

const TRANSACTION_KEY = "transactions";

export const getAllTransactions = (): Transaction[] => {
    const data = localStorage.getItem(TRANSACTION_KEY);
    return data ? JSON.parse(data) : [];
    
}


export const getTransactionsByPerson = (personId: number): Transaction[] => {
    return getAllTransactions().filter(t => t.personId === personId);
}

export const addTransaction = (transaction: Transaction): void => {
    const transactions = getAllTransactions();
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.transactionId ?? 0)) + 1 : 1;
    transactions.push({ ...transaction, transactionId: newId });
    localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
}

export const deleteTransaction = (transactionId: number): void => {
    const filtered = getAllTransactions().filter(t => t.transactionId !== transactionId);
    localStorage.setItem(TRANSACTION_KEY, JSON.stringify(filtered));
}

export const getTotalTransactions = (): {
    totalIncomes: number;
    totalExpenses: number;
    total: number;
} => {
    const transactions = getAllTransactions();    

    const totalIncomes = transactions
        .filter(t => t.type === "receita")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === "despesa")
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        totalIncomes,
        totalExpenses,
        total: totalIncomes - totalExpenses,
    };
};