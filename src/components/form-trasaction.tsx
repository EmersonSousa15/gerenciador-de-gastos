import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTransactionMutate } from "../hooks/useTransactionMutate";
import { Toast } from "./toast";
import { usePersonData } from "../hooks/usePersonData";
import { useCategories } from "../hooks/useListCategories";
import { Category } from "../types/Category";

type FormTransactionData = {
  description: string;
  value: number;
  personId: string;
  type: "despesa" | "receita";
  categoryId: string;  // novo campo string por ser value do select
};

export const FormTransaction = () => {
  const { handleSubmit, register, reset } = useForm<FormTransactionData>();
  const [valueTransaction, setValueTransaction] = useState("");
  const [isAdult, setIsAdult] = useState(true);

  const { mutate, isError, isSuccess } = useTransactionMutate();
  const { data: listPersonData, isLoading, isSuccess: isSuccessPerson, isError: isErrorPerson } = usePersonData();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const handleAddTransaction = (data: FormTransactionData) => {
    const transaction = {
      amount: parseFloat(String(data.value).replace(/\D/g, "")) / 100,
      personId: parseInt(data.personId),
      description: data.description,
      type: data.type,
      categoryId: parseInt(data.categoryId),
    };

    mutate(transaction);
    setValueTransaction("");
    reset();
  };

  const handleChangePerson = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const age = listPersonData?.find((person) => person.personId === parseInt(e.target.value))?.age;

    if (age && age >= 18) {
      setIsAdult(true);
    } else {
      setIsAdult(false);
    }
  };

  const formatCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currency = e.target.value.replace(/\D/g, "");

    const formatedCurrency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(currency) / 100);

    setValueTransaction(formatedCurrency);
  };

  return (
    <form onSubmit={handleSubmit(handleAddTransaction)} className="w-full flex flex-col justify-center items-center p-3">
      <div className="w-9/10">
        <div className="flex flex-col">
          <label htmlFor="person">Pessoa</label>
          <select
            id="person"
            className="border border-gray-200 py-1 px-2 rounded"
            required
            {...register("personId")}
            onChange={(e) => handleChangePerson(e)}
          >
            {isSuccessPerson && <option value="">Selecione uma pessoa</option>}
            {isLoading && <option value="">Carregando...</option>}
            {!isLoading &&
              listPersonData?.map((person) => (
                <option key={person.personId} value={person.personId}>
                  {person.name}
                </option>
              ))}
            {(listPersonData?.length === 0 || isErrorPerson) && <option value="">Nenhuma pessoa cadastrada.</option>}
          </select>
        </div>

        <br />

        <div className="flex flex-col gap-1">
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Descrição"
            rows={4}
            className="resize-none border border-gray-200 py-1 px-2 rounded"
            required
          />
        </div>

        <br />

        <div className="flex flex-col">
          <label htmlFor="value">Valor</label>
          <input
            type="string"
            id="value"
            {...register("value")}
            onChange={(e) => formatCurrency(e)}
            value={valueTransaction}
            placeholder="Valor"
            className="border border-gray-200 py-1 px-2 rounded"
            required
          />
        </div>

        <br />

        <div className="flex flex-col">
          <label htmlFor="type">Tipo</label>
          <div className="flex gap-3">
            <div className="flex gap-2">
              <input type="radio" id="expense" value="despesa" {...register("type")} className="h-full" required />
              <label htmlFor="expense">Despesa</label>
            </div>
            {isAdult && (
              <div className="flex gap-2">
                <input type="radio" id="income" value="receita" {...register("type")} required />
                <label htmlFor="income">Receita</label>
              </div>
            )}
          </div>
        </div>

        <br />

        <div className="flex flex-col">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            {...register("categoryId")}
            className="border border-gray-200 py-1 px-2 rounded"
            required
            disabled={isLoadingCategories}
            defaultValue=""
          >
            <option value="" disabled>
              {isLoadingCategories ? "Carregando categorias..." : "Selecione uma categoria"}
            </option>
            {categories?.map((category: Category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {isSuccess && <Toast type="success" title="Transação cadastrada com sucesso!" />}
        {isError && <Toast type="error" title="Ocorreu um erro ao cadastrar a transação." description="Por favor, tente novamente." />}
      </div>

      <br />

      <div className="-mt-2">
        <button
          type="submit"
          className="bg-green-prod text-white p-1 w-50 h-12 cursor-pointer rounded-full text-lg transition-all delay-200 hover:shadow-xl"
        >
          Cadastrar
        </button>
      </div>
    </form>
  );
};
