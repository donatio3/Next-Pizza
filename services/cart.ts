import { axiosInstance } from "./instance"
import { CartDTO } from "./dto/cart.dto"

export const getCart = async (): Promise<CartDTO> => {
   return (await axiosInstance.get<CartDTO>('/cart')).data
}

export const updateItemQuantity = async (itemId: number, quantity: number) => {
    return (await axiosInstance.patch<CartDTO>(`/cart/${itemId}`, {quantity})).data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>(`/cart/${id}`)).data
}

export const addCartItem = async (values: any):Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>(`/cart`, values)).data
}