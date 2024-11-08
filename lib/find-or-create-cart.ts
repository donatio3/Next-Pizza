import { prisma } from "@/prisma/prisma-client"


// поиск или создание корзины
export const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token
        },
    })

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token,
                totalAmount: 0
            }
        })
    }

    return userCart
}