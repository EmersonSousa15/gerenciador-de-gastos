// Tipo personalizado que definirá a categoria de uma transação
export type Category = {
  categoryId: number;
  name: string;
}

export type NewCategoryInput = {
  name: string;
};