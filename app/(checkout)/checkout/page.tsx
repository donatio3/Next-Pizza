'use client';
import { Title } from "@/components/shared";
import { CheckoutSidebar } from "@/components/shared/checkout-sidebar";
import { Container } from "@/components/shared/container";
import { useCart } from "@/hooks";
import { FormProvider, useForm  } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import { CheckoutAddressForm, CheckoutCart } from "@/components/shared/checkout";
import { CheckoutPersonalForm } from "@/components/index";
import { checkoutFormSchema, CheckoutFormValues } from "@/constants/index";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";


export default function checkoutPage() {
    const [submitting, setSubmitting] = useState(false)
    const {totalAmount, items, loading, removeCartItem, updateItemQuantity} = useCart()
    const {data : session} = useSession() // возвращает данные сеанса вошедшего в систему usera.
    

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema), // будет использовать определнную валидацию 
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            comment: '',
        }
    }) // 


    useEffect(() => {
        async function fetchUserInfo() {
          const data = await Api.auth.getMe();
          const [firstName, lastName] = data.fullName.split(' ');
    
          form.setValue('firstName', firstName);
          form.setValue('lastName', lastName);
          form.setValue('email', data.email);
        }
    
        if (session) {
          fetchUserInfo();
        }
      }, [session]);

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuanity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuanity)
    }

    const onClickRemoveItem = (id: number) => {
        removeCartItem(id)
    }

    const onSubmit = async (data: CheckoutFormValues)  => {
        try {
            setSubmitting(true) 

            const url = await createOrder(data) // ccылка на создание заказа, и потом перенаврвим Usera на нее

            toast.success('Заказ создан! Перенаправляем вас на страницу оплаты ... ', {
                icon: '✅'
            })

            if (url) {
                location.href = url
            }
            console.log(url, 'url')

        } catch (error) {
            console.log(error)
            setSubmitting(false)
            toast.error('Не удалось создать заказ', {
                icon: '❌'
            })            
        } 
    }
   
    return (
        <Container className="mt-5">
            <Title text="Оформление заказа" className="font-extrabold mb-10 text-[37px]"  />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        {/* ЛЕВАЯ часть */}
                        <div className="flex flex-col gap-10 flex-1 mb-20">

                            <CheckoutCart 
                                items={items}
                                loading={loading}
                                onClickCountButton={onClickCountButton}
                                onClickRemoveItem={onClickRemoveItem} />

                            <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                            <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                            
                        </div>

                        {/* ПРАВАЯ часть */}

                        <div className="w-[450px]">
                            <CheckoutSidebar loading={loading || submitting} totalAmount={totalAmount} />
                        </div>
                    </div>
                </form>
            </FormProvider>

        </Container>
    )
}
