import { useState } from "react"
import { usePersonDelete } from "../hooks/usePersonDelete";
import { Toast } from "./toast";
import { ModalTransactionsOfPerson } from "./modal-transactions-of-person";
import { useListPerson } from "../hooks/useListPerson";

export const ListOfPeople = () => {
    const [idPerson, setIdPerson] = useState<number>(0);
    const {data: listBalanceOfPerson, isLoading, isError: isErrorListPerson} = useListPerson();

    const { mutate, isSuccess, isError } = usePersonDelete();

    const handleDeleteUser = (id: number) => {
        mutate(id);
    }

    const handleOpenTransactionsDetails = (id: number) => {
        if (!id) return;
        setIdPerson(id);
    }

    return (
        <section className="bg-white shadow-xl">
            <table className="w-full">
                <thead className="border-y-1">
                    <tr>
                        <th>N°</th>
                        <th>Nome</th>
                        <th>Total de receitas</th>
                        <th>Total de despesas</th>
                        <th>Saldo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && listBalanceOfPerson?.map((balance, index) => (
                        <tr className="border-b-1 text-center cursor-pointer" key={index}>
                            <td className="h-10" onClick={() => balance?.personId && handleOpenTransactionsDetails(balance.personId)}>
                                {index + 1}
                            </td>
                            <td className="h-10" onClick={() => balance?.personId && handleOpenTransactionsDetails(balance.personId)}>
                                {balance?.name}
                            </td>
                            <td className="text-green-prod" onClick={() => balance?.personId && handleOpenTransactionsDetails(balance.personId)}>
                                {
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance?.totalIncomes)
                                }
                            </td>
                            <td className="text-red-prod" onClick={() => balance?.personId && handleOpenTransactionsDetails(balance.personId)}>
                                {
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance?.totalExpenses)
                                }
                            </td>
                            <td className={`
                                ${balance?.total > 0 && "text-green-prod"}
                                ${balance?.total < 0 && "text-red-prod"} 
                                ${balance?.total === 0 && "text-blue-prod"}`}
                                onClick={() => balance?.personId && handleOpenTransactionsDetails(balance.personId)}
                            >
                                {
                                    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(balance?.total)
                                }
                            </td>
                            <td className="w-20">
                                <button className="bg-red-prod hover:bg-red-800 transition-all delay-200 cursor-pointer text-white font-bold  px-4 rounded"
                                    onClick={() => balance?.personId && handleDeleteUser(balance.personId)}
                                >
                                    Apagar
                                </button>
                            </td>
                        </tr>
                    ))}

                    {isLoading &&
                        <tr>
                            <td colSpan={5} className="text-center">Carregando...</td>
                        </tr>
                    }

                    {listBalanceOfPerson?.length === 0 || isErrorListPerson &&
                        <tr>
                            <td colSpan={5} className="text-center">Nenhuma pessoa cadastrada.</td>
                        </tr>
                    }

                </tbody>
            </table>

            { idPerson !== 0 && 
                <ModalTransactionsOfPerson idPerson={idPerson} setIdPerson={setIdPerson} />   
            }
            
            {isSuccess &&
                <Toast type="success" title="Pessoa deletada com sucesso!" />
            }

            {isError &&
                <Toast type="error" title="Ocorreu um erro ao deletar a pessoa." description="Por favor, tente novamente."
                />
            }
        </section>
    )
}