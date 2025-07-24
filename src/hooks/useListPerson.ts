import { useQuery } from "@tanstack/react-query";
import { getBalances } from "../utils/localBalance";

export const useListPerson = () => {
    return useQuery({
        queryFn: () => Promise.resolve(getBalances()),
        queryKey: ["list-person"],
        retry: false
    });
}
