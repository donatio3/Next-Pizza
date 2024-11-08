import {z} from 'zod'

export const checkoutFormSchema = z.object({
    firstName: z.string().min(1, {message: 'Имя должно содержать не менее 2-ух символов'}),
    lastName: z.string().min(1, {message: 'Фамилия должна содержать не менее 2-ух символов'}),
    email: z.string().email({message: 'Введите корректный email'}),
    phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
    address: z.string().min(5, {message: 'Введите корректный адрес доставки'}),
    comment: z.string().min(5, {message: 'Комментарий должен содержать не менее 5 символов'}),
})

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>