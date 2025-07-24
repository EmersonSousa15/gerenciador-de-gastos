import { FormCategory } from "../../components/form-category"
import { FormPerson } from "../../components/form-person"
import { FormTransaction } from "../../components/form-trasaction"
import { ListOfPeople } from "../../components/list-of-people"
import { useSumAll } from "../../hooks/useTotalTransactions"

export const Home = () => {
    const summedData = useSumAll() ?? {
        totalExpenses: 0.0,
        totalIncomes: 0.0,
        total: 0.0
    };
    

    return (
        <>
            <header className="h-60 flex justify-center items-center bg-gray-200 shadow-md">
                <h1 className="text-4xl font-semibold text-center">
                    Controle de Gastos Residenciais
                </h1>
            </header>
            <main className="mb-10">

                <section className="w-full flex justify-evenly items-center -mt-15 text-center gap-3 px-1">


                    {summedData &&
                        <>
                            <div className="w-75 h-30 text-white shadow-xl p-3 rounded bg-green-prod">
                                <h2 className="text-xl font-semibold">Receitas</h2>
                                <p className="mt-5 font-semibold text-lg">{(summedData.totalIncomes).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            <div className="w-75 h-30 text-white shadow-xl p-3 rounded bg-red-prod">
                                <h2 className="text-xl font-semibold">Despesas</h2>
                                <p className="mt-5 font-semibold text-lg">{(summedData.totalExpenses).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                            
                            <div className="w-75 h-30 text-white shadow-xl p-3 rounded bg-blue-prod">
                                <h2 className="text-xl font-semibold">Total</h2>
                                <p className="mt-5 font-semibold text-lg">{(summedData.total).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        </>
                    }
                </section>
                
                <section className="w-full p-5 mt-10 m-auto flex gap-5 flex-wrap md:flex-nowrap">
                    <div className="w-full bg-white shadow-lg h-75">
                        <h3 className="text-lg font-semibold p-2 w-full">Adicionar Pessoa</h3>
                        {/*Componente de Form para cadastrar novas pessoas*/}
                        <FormPerson />
                    </div>
                    <div className="w-full bg-white shadow-lg h-75">

                        <h3 className="text-lg font-semibold p-2 w-full">Adicionar Categoria</h3>
                        {/*Componente de Form para cadastrar novas transações*/}
                        <FormCategory />
                    </div>

                    <div className="w-full h-[500px] bg-white shadow-lg overflow-y-scroll">

                        <h3 className="text-lg font-semibold p-2 w-full">Adicionar Transação</h3>
                        {/*Componente de Form para cadastrar novas transações*/}
                        <FormTransaction />
                    </div>
                </section>

                <section className="w-9/10 mt-10 m-auto">
                    <h3 className="text-lg font-semibold p-2 w-full text-center">Listagem de balanço por pessoa</h3>
                    {/*Componente que mostra as pessoas cadastradas e o total de suas transações*/}
                    <ListOfPeople />
                </section>
            </main>
            <footer className="h-50 flex justify-center items-center mt-15 bg-gray-200">
                <p className="text-lg">&copy; Desenvolvido por Emerson</p>
            </footer>
        </>
    )
}