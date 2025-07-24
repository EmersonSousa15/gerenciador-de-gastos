// Tipo que define a estrutura do objeto Transação, para ficar de acordo com a tabela do banco de dados
export type Transaction = {
    transactionId?: number;
    description: string;
    amount: number;
    personId: number;
    type: string;
    categoryId: number;  // novo campo
}