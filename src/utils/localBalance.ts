import { Balance } from "../types/Balance";
import { getAllPersons } from "./localPersonStorage";
import { getAllTransactions } from "./localTransactionStorage";

export const getBalances = (): Balance[] => {
    const persons = getAllPersons();
    const transactions = getAllTransactions();

    return persons.map(person => {
        const personTransactions = transactions.filter(t => t.personId === person.personId);
        const totalIncomes = personTransactions
            .filter(t => t.type === "receita")
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = personTransactions
            .filter(t => t.type === "despesa")
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            personId: person.personId!,
            name: person.name,
            totalIncomes,
            totalExpenses,
            total: totalIncomes - totalExpenses
        };
    });
}
