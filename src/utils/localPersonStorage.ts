import { Person } from "../types/Person";
import { getAllTransactions } from "./localTransactionStorage";

const PERSON_KEY = "persons";
const TRANSACTION_KEY = "transactions";

export const getAllPersons = (): Person[] => {
    const data = localStorage.getItem(PERSON_KEY);
    return data ? JSON.parse(data) : [];
}

const saveAllPersons = (persons: Person[]) => {
    localStorage.setItem(PERSON_KEY, JSON.stringify(persons));
}


export const addPerson = (person: Person): void => {
    const persons = getAllPersons();
    const newId = persons.length > 0 ? Math.max(...persons.map(p => p.personId ?? 0)) + 1 : 1;
    persons.push({ ...person, personId: newId });
    saveAllPersons(persons);
}

export const deletePersonAndTransactions = (personId: number): void => {
  const persons = getAllPersons().filter(p => p.personId !== personId);
  localStorage.setItem(PERSON_KEY, JSON.stringify(persons));

  const transactions = getAllTransactions().filter(t => t.personId !== personId);
  localStorage.setItem(TRANSACTION_KEY, JSON.stringify(transactions));
}