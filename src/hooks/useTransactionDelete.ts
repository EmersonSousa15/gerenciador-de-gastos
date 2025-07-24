import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../utils/localTransactionStorage";

export const useDeleteTransaction = () => {
    const query = useQueryClient();

    const mutate = useMutation({
        mutationFn: (transactionId: number) => {
            deleteTransaction(transactionId);
            return Promise.resolve();
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["transactions-of-person"] });
            query.invalidateQueries({ queryKey: ["total-transactions"] });
            query.invalidateQueries({ queryKey: ["list-person"] });
        },
    });

    return mutate;
};
