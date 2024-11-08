import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";


export const getAll = async (): Promise<Ingredient[]> => {
    return (await axiosInstance.get(ApiRoutes.INGRIDIENTS))
    .data
}