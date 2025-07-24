import axios from "axios";

// Serviço para criar uma instância do axios e fornecer a baseUrl da api
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
})

