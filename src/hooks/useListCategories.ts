import { useQuery } from "@tanstack/react-query";
import { Category } from "../types/Category";

const CATEGORY_KEY = "categories";

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => {
      const categoriesString = localStorage.getItem(CATEGORY_KEY);
      const categories: Category[] = categoriesString ? JSON.parse(categoriesString) : [];
      return Promise.resolve(categories);
    },
  });
};
