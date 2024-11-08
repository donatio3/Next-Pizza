import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// обновление quanity у cartItem а затем и Суммы корзины   
export async function PATCH(req: NextRequest, {params}: {params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id) //  Получаем id из параметров URL
        const data = (await req.json()) as {quantity: number} // передаем число нужное для обновления quantity 
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({error: 'Токен отсутствует'}, {status: 401})
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            },
        })

        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'}, {status: 404})
        }

        await prisma.cartItem.update({
            where: {
                id // находим по id
            },
            data: {
                quantity: data.quantity // обновялем quantity
            }
        })

        // Обновляем общую сумму корзины и возвращаем ее userу
        const updatedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedUserCart)

        // запрос клиента: url - /cart/3
        // json - {quantity: 3} => обновит у 3 товара quantity на 3 
    } catch (error) {
        console.log('[CART_PATCH] Server error', error)
        return NextResponse.json({error: 'Не удалось обновить корзину'}, {status: 500})
    }
}

export async function DELETE(req: NextRequest, {params}: {params: Promise<{ id: string }> }) {
    try {
        const id = Number((await params).id)
        const token = req.cookies.get('cartToken')?.value

        if (!token) {
            return NextResponse.json({error: 'Токен отсутствует'}, {status: 401})
        }
        
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id
            },
        })

        if (!cartItem) {
            return NextResponse.json({error: 'Cart item not found'}, {status: 404})
        }

        await prisma.cartItem.delete({
            where: {
                id
            }
        })

        // Обновляем корзину
        const updatedUserCart = await updateCartTotalAmount(token)
        return NextResponse.json(updatedUserCart)

    } catch (error) {
        console.log('[CART_DELETE] Server error', error)   
        return NextResponse.json({error: 'Не удалось удалить товар из корзины'}, {status: 500})
    }
}