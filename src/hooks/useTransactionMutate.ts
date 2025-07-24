import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../types/Transaction";
import { addTransaction } from "../utils/localTransactionStorage";

export const useTransactionMutate = () => {
    const query = useQueryClient();

    const mutate = useMutation({
        mutationFn: (transaction: Transaction) => {
            addTransaction(transaction);
            return Promise.resolve();
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["total-transactions"] });
            query.invalidateQueries({ queryKey: ["list-person"] });
            query.invalidateQueries({ queryKey: ["transactions-of-person"] });
        },
    });

    return mutate;
};
