import { NewCategoryInput } from "../types/Category";

export type Category = {
  categoryId: number;
  name: string;
};

const CATEGORY_KEY = "categories";

export const addCategory = (category: NewCategoryInput) => {
  const categoriesString = localStorage.getItem(CATEGORY_KEY);
  const categories: Category[] = categoriesString ? JSON.parse(categoriesString) : [];

  const newId = categories.length > 0 ? Math.max(...categories.map(c => c.categoryId)) + 1 : 1;

  const newCategory: Category = { categoryId: newId, ...category };

  categories.push(newCategory);
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
};