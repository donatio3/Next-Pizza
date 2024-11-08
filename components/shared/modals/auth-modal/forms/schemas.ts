import { z } from "zod";

export const passwordSchema = z.string().optional();

export const formLoginSchema = z.object({
    email: z.string().email({message: 'Некорректный email'}),
    password: passwordSchema
});


export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(3, {message: 'Минимум 3 символа'}),
        confirmPassword: passwordSchema,
    })
).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'] // path - путь к полю в котором произошла ошибка
});

export const formUpdateSchema = z.object({
    email: z.string().email({message: 'Некорректный email'}),
    fullName: z.string().min(3, {message: 'Минимум 3 символа'}),
    password: z.string().min(6, {message: 'Минимум 6 символов'}).optional(),
    confirmPassword: z.string().min(6, {message: 'Минимум 6 символов'}).optional(), 
}).refine((data) => {
    // Проверка только если оба поля заполнены
    if (data.password || data.confirmPassword) {
      return data.password === data.confirmPassword;
    }
    return true;
  }, 
  {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'] // path - путь к полю в котором произошла ошибка
});

export type TFormLoginValue = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormUpdateValues = z.infer<typeof formUpdateSchema>;
