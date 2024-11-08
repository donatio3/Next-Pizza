'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { formUpdateSchema, TFormUpdateValues,} from './modals/auth-modal/forms/schemas';
import { FormInput } from './form-components';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formUpdateSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
    },
  });

  const { setFocus, formState: { errors } } = form;



  const onSubmit = async (data: TFormUpdateValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({ // выходит с аккаунта благодаря удалению sesson cookie
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
      <Title text={`Личные данные | ${data.fullName}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль"  required={false}/>
          <FormInput type="password" name="confirmPassword" label="Повторите пароль"  required={false}/>

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
