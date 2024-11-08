import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

// ВОЗВРАЩАЕТ МАССИВ Product
export const search = async (query: string): Promise<Product[]> => { // Product автом. сгенерировался Nextом 
    return (await axiosInstance.get<Product[]>(ApiRoutes.PRODUCTS, {params: {query}}))
    .data
}

