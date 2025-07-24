import { useQuery } from "@tanstack/react-query";
import { getTotalTransactions } from "../utils/localTransactionStorage";

export const useSumAll = () => {
    const data = useQuery({
        queryFn: () => Promise.resolve(getTotalTransactions()),
        queryKey: ["total-transactions"],
    });

    return data.data;
};
