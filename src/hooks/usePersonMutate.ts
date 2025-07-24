import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPerson } from "../utils/localPersonStorage";
import { Person } from "../types/Person";

export const usePersonMutate = () => {
    const query = useQueryClient();

    const mutate = useMutation({
        mutationFn: (person: Person) => {
            addPerson(person);
            return Promise.resolve();
        },
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["person-data"] });
            query.invalidateQueries({ queryKey: ["list-person"] });
        }
    });

    return mutate;
}
