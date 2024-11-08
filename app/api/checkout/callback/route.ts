import { PaymentCallbackData } from "@/@types/yookassa";
import { OrderCanceledTemplate, OrderSuccessTemplate } from "@/components";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { CartItemDTO } from "@/services/dto/cart.dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


// api/checkout/callback
// прийдет в виде POST с данными о статусе заказа
// и взависимости от статуса будем менять статус заказа в бд

export async function POST(req: NextRequest) {
    try {

        const body = (await req.json()) as PaymentCallbackData
        
        // поиск заказа по id чтобы менять статус заказа
        const order = await prisma.order.findFirst({
            where: {id: Number(body.object.metadata.order_id)},
        })

        if (!order) {
            return NextResponse.json({error: 'Order not found'})
        }

        const isSucceeded = body.object.status === 'succeeded'

        await prisma.order.update({
            where: {id: order.id},
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED
            }
        }) 

        const items = JSON.parse(order?.items as string) as CartItemDTO[]

       if (isSucceeded) {
        await sendEmail(
            order.email,
            'Next Pizza | Ваш заказ успешно оформлен',
            OrderSuccessTemplate({orderId: order.id, items})
        )
       } else {
        // письмо о неуспешной оплате
        await sendEmail(
            order.email,
            'Next Pizza | Ваш заказ был отменен',
            OrderCanceledTemplate({orderId: order.id, items})
        )}


        
    } catch (error) {
        console.log('[Checkout Callback]: Error ', error)
        return NextResponse.json({error: 'Server error'})
    }
}