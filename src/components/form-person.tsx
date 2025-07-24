import { useForm } from "react-hook-form"
import { usePersonMutate } from "../hooks/usePersonMutate";
import { Toast } from "./toast";

type FormPersonData = {
    name: string;
    age: string;
}

export const FormPerson = () => {
    const { handleSubmit, register, reset } = useForm<FormPersonData>();
    const { mutate, isSuccess, isError } = usePersonMutate();

    const handleAddPerson = async (data: FormPersonData) => {
        const person = {
            name: data.name,
            age: parseInt(data.age)
        }

        mutate(person);
        reset();
    }


    return (
        <form onSubmit={handleSubmit(handleAddPerson)} className="w-full flex flex-col justify-center items-center p-3">
            <div className="w-9/10">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" {...register("name")} placeholder="Nome" className="border border-gray-300 py-1 px-2 rounded" required />
                </div>

                <br />

                <div className="flex flex-col gap-1">
                    <label htmlFor="age">Idade</label>
                    <input type="number" id="age" min={0} max={150} {...register("age")} placeholder="Idade" className="border border-gray-300 py-1 px-2 rounded" required />
                </div>
            </div>

            <div className="mt-10">
                <button type="submit" className="bg-green-prod text-white p-1 w-50 h-12 cursor-pointer rounded-full text-lg transition-all delay-200 hover:shadow-xl">Cadastrar</button>
            </div>

            {
                isSuccess && (
                    <Toast title="Pessoa cadastrada com sucesso!" type={"success"} />
                )
            }

            {
                isError &&
                <Toast type="error" title="Ocorreu um erro ao cadastrar a pessoa." description="Por favor, tente novamente."
                />
            }
        </form>
    )
}