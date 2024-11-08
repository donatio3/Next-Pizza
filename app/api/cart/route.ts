    import { prisma } from "@/prisma/prisma-client";
    import { NextRequest, NextResponse } from "next/server";
    import crypto from 'crypto'
    import { findOrCreateCart } from "@/lib/find-or-create-cart";
    import { CreateCartItemValues } from "@/services/dto/cart.dto";
    import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
    // получение корзины 
    export async function GET(req: NextRequest) {
        try {
            // get user
            const token = req.cookies.get('cartToken')?.value

            if (!token) { // если токента нет то return пустую корзину
                return NextResponse.json({items: []})
            }

            const userCart = await prisma.cart.findFirst({
                where: {
                    OR: [
                        {
                            token
                        }
                    ]
                },
                include: {
                    items: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            productItem: {
                                include: {
                                    product: true
                                }
                            },
                            ingredients: true
                        },
                    }
                }
            })

            return NextResponse.json(userCart)
        } catch (error) {
            console.log('[CART_GET] Server error', error)
            return NextResponse.json({error: 'Не удалось получить корзину'}, {status: 500})
        } 


    }


    export async function POST(req: NextRequest) {
        try {
            let token = req.cookies.get('cartToken')?.value

            if (!token) {
                token = crypto.randomUUID() // РАНДОМ ТОКЕН
            }
            console.log(token, 'token')

            // создание или нахождение корзины
            const userCart = await findOrCreateCart(token)
            
            const data = (await req.json()) as CreateCartItemValues

    //(1) есть ли добавляемый товар в корзине И если товар совпадает ИНГРИДИЕНТАМИ И Т Д? 
    
            const findCart = await prisma.cartItem.findMany({
                where: { cartId: userCart.id },
                include: {
                    ingredients: true
                }
            });

            const findCartItem = findCart.find(el => 
                el.cartId === userCart.id 
                && el.productItemId === data.productItemId 
                && el.ingredients.length === data.ingredients?.length 
                && el.ingredients.map(ing => ing.id).sort().join() === data.ingredients?.sort().join()
            )

            // ЕСЛИ ТОВАР НАЙДЕН ТО +1 QUANTITY
            if (findCartItem) {
                await prisma.cartItem.update({
                    where: {
                        id: findCartItem.id
                    },
                    data: {
                        quantity: findCartItem.quantity + 1,
                    }
                })
            } else {
                await prisma.cartItem.create({
                    data: {
                        quantity: 1,
                        productItemId: data.productItemId,
                        ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
                        cartId: userCart.id
                    }
                })
            }

    // (2) ТОВАР НЕ НАЙДЕН => создаем новый cartItem

            

            const updatedUserCart = await updateCartTotalAmount(token)

            const resp = NextResponse.json(updatedUserCart)
            resp.cookies.set('cartToken', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7
            })

            return resp
            // МЫ СШИВАЕМ ПОЛЬЗОВАТЕЛЮ токен => в след раз корзина не будет заново создаваться

        } catch (error) {
            console.log('[CART_POST] не удалось создать корзину', error)
        }
    }