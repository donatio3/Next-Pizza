'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { FormProvider, useForm } from 'react-hook-form';
import { formRegisterSchema, TFormRegisterValues } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Title } from '@radix-ui/react-dialog';
import { FormInput } from '@/components/shared/form-components';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';

interface Props {
  className?: string
  onClose: () => void
}

export const RegisterForm: React.FC<Props> = ({className, onClose}) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password as string,
            });
            
            toast.error('Вы успешно зарегистрировались', {
                icon: '✅',
            });

            onClose?.();
        } catch (error) {
        console.error('Error [LOGIN]', error);
        return toast.error('Не удалось зарегистрироваться', {
            icon: '❌',
      });
    }
    }


  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
    
  );
};
