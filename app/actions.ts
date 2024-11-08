'use server'
import { CheckoutFormValues } from "@/constants";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from '@/lib';
import { getUserSession } from '@/lib/get-user-session';
import { hashSync } from 'bcryptjs';

// все серверныe actions должны быть в одном файле 

export async function createOrder(data: CheckoutFormValues) {
    console.log(`Email: "${data.email}"`);

    try {
        const cookieStore = cookies()
        const cartToken = (await cookieStore).get('cartToken')?.value

        if (!cartToken) {
            throw Error('Cart token not found')
        }

        // поиск корзины по токену
        const userCart = await prisma.cart.findFirst({
            
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },

            where: {  // поиск корзины по токену user
                token: cartToken
            },
        })

        if (!userCart) {
            throw Error('Cart not found')
        }

        // проверка на пустую корзину
        if (userCart?.totalAmount === 0) {
            throw Error('Cart is empty')
        }

        // CОЗДАНИЕ ЗАКАЗА 
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email.trim(),
                phone: String(data.phone),
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
            }   
        })

        // Очищаем корзину
        await prisma.cart.update({
            where: {
                id: userCart.id,
            },
            data: {
                totalAmount: 0,
            }
        })

        await prisma.cartItem.deleteMany({
            where: { // удаляем товары которые находятся в определенной корзине
                cartId: userCart.id,
            }
        })


        // СДЕЛАТЬ ССЫЛКУ НА ОПЛАТУ

        const paymentData = await createPayment({
            amount: order.totalAmount,
            description: 'Оплата заказа #' + order.id,
            orderId: order.id
        })


        if (!paymentData) {
            throw new Error('Payment data not found')
        }

        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.confirmation.confirmation_url
            }
        })

        const paymentUrl = paymentData.confirmation.confirmation_url

        // отправка письма на почту

        const { email } = data; // Передавайте email из данных
        const subject = `Next Pizza / Оплатите заказ #${order.id}`;
        // const body = PayOrderTemplate({
        //     orderId: order.id,
        //     totalAmount: order.totalAmount,
        //     paymentUrl
        // });
        
        // await sendEmail(`${email}`, subject, body);

        return paymentUrl // ссылка на оплату ВОЗВРАЩАЕТСЯ 

    } catch (error) {
        console.log(`[CreateOrder] Server error`, error)
    }
}

// функция для обновления данных пользователя
export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
    

      const currentUser = await getUserSession(); // человек авторизован?
  
      if (!currentUser) {
        throw new Error('Пользователь не найден');
      }
  
      const findUser = await prisma.user.findFirst({
        where: {
          id: Number(currentUser.id),
        },
      });
  
      await prisma.user.update({
        where: {
          id: Number(currentUser.id),
        },
        data: {
          fullName: body.fullName,
          email: body.email,     // ЕСЛИ ИЗМЕНИЛИ ПАРОЛЬ ТО МЕНЯЕМ, ИНАЧЕ ПЕРЕДАЕМ ТОТ ЖЕ ИЗ БД
          password: body.password ? hashSync(body.password as string, 10) : findUser?.password,

        },
      });
    } catch (err) {
      console.log('Error [UPDATE_USER]', err);
      throw err;
    }
  }


  export async function registerUser(body: Prisma.UserCreateInput) {
    'use server'
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
  
      if (user) {
        if (!user.verified) {
          throw new Error('Почта не подтверждена');
        }
  
        throw new Error('Пользователь уже существует');
      }
   
    const createdUser = await prisma.user.create({
        data: {
          fullName: body.fullName,
          email: body.email,
          password: hashSync(body.password, 10),
        },
      });
      
      const code = Math.floor(100000 + Math.random() * 900000).toString();
  
      await prisma.verificationCode.create({
        data: {
          code,
          userId: createdUser.id,
        },
      });
  

    //   await sendEmail(
    //     createdUser.email,
    //     'Next Pizza / 📝 Подтверждение регистрации',
    //     VerificationUserTemplate({
    //       code,
    //     }),
    //   );
    } catch (err) {
      console.log('Error [CREATE_USER]', err);
      throw err;
    }
  }
  








