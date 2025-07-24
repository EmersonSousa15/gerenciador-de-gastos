import { useQuery } from "@tanstack/react-query";
import { getAllPersons } from "../utils/localPersonStorage";

export const usePersonData = () => {
    return useQuery({
        queryFn: () => Promise.resolve(getAllPersons()),
        queryKey: ["person-data"],
        retry: false
    });
}
