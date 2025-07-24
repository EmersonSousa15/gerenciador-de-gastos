import { useEffect, useState } from "react"

type ToastProps = {
    type: "success" | "warning" | "error";
    description?: string;
    title: string;
}

export const Toast = ({ type, description, title }: ToastProps) => {
    const [right, setRight] = useState("right-2")
    const toastType = type === "success" ? "green-prod" : type === "warning" ? "blue-prod" : "red-prod"


    useEffect(() => {
        const time = setTimeout(() => {
            setRight("-right-[100%]")
        }, 5000)


        return () => clearTimeout(time)
    }, [])

    const handleClose = () => {
        setRight("-right-full")
    }


    return (
        <div className={`transition-all delay-200 fixed w-[400px] top-5 ${right} bg-${toastType} text-white p-5 rounded-2xl`}>
            <div className="">
                <h3 className="mr-auto text-1xl font-semibold">{title}</h3>
                <button type="button" className="ml-2 mb-1 close text-xl cursor-pointer absolute top-1 right-5" onClick={() => handleClose()} aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="break-all">
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}