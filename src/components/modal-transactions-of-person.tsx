import { IoIosClose } from "react-icons/io";
import { Toast } from "./toast";
import { useTransactionOfPerson } from "../hooks/useTransactionsOfPerson";
import { useDeleteTransaction } from "../hooks/useTransactionDelete";
import { useCategories } from "../hooks/useListCategories";

type ModalTransactionsOfPersonProps = {
    idPerson: number;
    setIdPerson: React.Dispatch<React.SetStateAction<number>>;
}

export const ModalTransactionsOfPerson = ({ idPerson, setIdPerson }: ModalTransactionsOfPersonProps) => {
    const { data: transactions, isLoading } = useTransactionOfPerson(idPerson);
    const { mutate, isSuccess } = useDeleteTransaction();
    const { data: categories } = useCategories();

    const handleCloseModal = () => {
        setIdPerson(0);
    }

    const handleDeleteTransaction = (idDeleteTransaction: number) => {
        mutate(idDeleteTransaction);
    }

    const getCategoryName = (categoryId: number) => {
        return categories?.find(cat => cat.categoryId === categoryId)?.name ?? "Sem categoria";
    }

    return (
        <section className="fixed w-screen h-screen flex justify-center items-center bg-[#64646451] top-0 left-0 ">
            <div className="w-[700px] h-[400px] bg-white rounded-3xl flex items-center flex-col overflow-y-auto px-5 pb-10">

                <button className="relative left-[40%] my-3 p-2" onClick={() => handleCloseModal()}>
                    <IoIosClose size={32} className="cursor-pointer" />
                </button>

                <table className="w-9/10 text-center ">
                    <thead className="border-y-1">
                        <tr>
                            <th>N°</th>
                            <th>Descrição</th>
                            <th>Tipo</th>
                            <th>Categoria</th>
                            <th>Valor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && transactions?.map((transaction, index) => (
                            <tr key={transaction.transactionId} className="border-b-1 text-center">
                                <td className="break-all max-w-[100px] h-10">
                                    {index + 1}
                                </td>
                                <td className="break-all max-w-[100px]">
                                    {transaction.description}
                                </td>
                                <td className="capitalize">
                                    {transaction.type}
                                </td>
                                <td>
                                    {getCategoryName(transaction.categoryId)}
                                </td>
                                <td>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction?.amount)}
                                </td>
                                <td className="w-20">
                                    <button
                                        className="bg-red-prod hover:bg-red-800 transition-all delay-200 cursor-pointer text-white font-bold px-4 rounded"
                                        onClick={() => handleDeleteTransaction(transaction?.transactionId ?? 0)}
                                    >
                                        Apagar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && transactions?.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center h-10">Nenhuma transação encontrada.</td>
                            </tr>
                        )}

                        {isLoading && (
                            <tr>
                                <td colSpan={6} className="text-center h-10">Carregando...</td>
                            </tr>
                        )}

                    </tbody>
                </table>

            </div>

            {isSuccess && (
                <Toast type="success" title="Transação deletada com sucesso!" />
            )}
        </section>
    )
}
