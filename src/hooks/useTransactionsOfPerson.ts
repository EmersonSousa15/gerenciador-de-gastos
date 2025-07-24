import { useQuery } from "@tanstack/react-query";
import { getTransactionsByPerson } from "../utils/localTransactionStorage";
import { Transaction } from "../types/Transaction";

export const useTransactionOfPerson = (personId: number) => {
    return useQuery<Transaction[]>({
        queryFn: () => Promise.resolve(getTransactionsByPerson(personId)),
        queryKey: ["transactions-of-person"],
        refetchInterval: 60000,
    });
};
