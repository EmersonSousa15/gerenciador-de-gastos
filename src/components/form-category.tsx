import { useForm } from "react-hook-form";
import { useCategoryMutate } from "../hooks/useCategoryMutate";
import { Toast } from "./toast";

type FormCategoryData = {
  name: string;
};

export const FormCategory = () => {
  const { handleSubmit, register, reset } = useForm<FormCategoryData>();
  const { mutate, isSuccess, isError } = useCategoryMutate();

  const handleAddCategory = (data: FormCategoryData) => {
    mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleAddCategory)} className="w-full flex flex-col justify-center items-center p-3">
      <div className="w-9/10">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome da Categoria</label>
          <input
            type="text"
            id="name"
            {...register("name")}
            placeholder="Ex: Alimentação"
            className="border border-gray-300 py-1 px-2 rounded"
            required
          />
        </div>
      </div>

      <br />

      <div className="mt-10">
        <button
          type="submit"
          className="bg-green-prod text-white p-1 w-50 h-12 cursor-pointer rounded-full text-lg transition-all delay-200 hover:shadow-xl"
        >
          Cadastrar
        </button>
      </div>

      {isSuccess && <Toast title="Categoria cadastrada com sucesso!" type="success" />}
      {isError && <Toast type="error" title="Erro ao cadastrar categoria" description="Tente novamente." />}
    </form>
  );
};
