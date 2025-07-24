import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePersonAndTransactions } from "../utils/localPersonStorage";

export const usePersonDelete = () => {
    const query = useQueryClient();

    const mutate = useMutation({
        mutationFn: (personId: number) => {
            deletePersonAndTransactions(personId);
            return Promise.resolve();
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["total-transactions"] });
            query.invalidateQueries({ queryKey: ["person-data"] });
            query.invalidateQueries({ queryKey: ["list-person"] });
        },
    });

    return mutate;
}
