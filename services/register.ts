import { Prisma } from "@prisma/client"
import { axiosInstance } from "./instance"

export const register = async (email: string, fullName: string, password: string) => {
    return (await axiosInstance.post<Prisma.UserCreateInput>('/auth/register', { email, fullName, password }))
    .data
}