import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../utils/localCategoryStorage";
import { NewCategoryInput } from "../types/Category";



export const useCategoryMutate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: NewCategoryInput) => {
      addCategory(category);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
