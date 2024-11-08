import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../../../prisma/prisma-client';
import { hashSync } from 'bcryptjs';
import {sendEmail} from '@/lib/sendEmail'; // предполагается, что у вас есть такая функция
import { VerificationUserTemplate } from '@/components';
import { NextRequest } from 'next/server';

// pages/api/auth/register/route.ts


export async function POST(req: NextRequest ) {
  try {
    const { email, fullName, password } = await req.json();
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (user) {
        if (!user.verified) {
          return new Response(JSON.stringify({ message: 'Почта не подтверждена' }), { status: 400 });
        }
        return new Response(JSON.stringify({ message: 'Пользователь уже существует' }), { status: 400 });
      }

    const createdUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashSync(password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({ code })
    );

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 200 });

  } catch (err) {
    console.error('Error [CREATE_USER]', err);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
