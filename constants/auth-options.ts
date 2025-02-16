import { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcryptjs";
import { UserRole } from "@prisma/client";

// Опции аутентификации
export const authOptions: AuthOptions = {
    // Провайдеры аутентификации
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      }),

      // GitHub Provider
      GitHubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',
        // Возвращает необходимые поля профиля
        profile(profile) {
          return {
            id: profile.id,
            email: profile.email,
            name: profile.name || profile.login,
            image: profile.avatar_url,
            role: 'USER' as UserRole,
          }
        }
      }),
      // Credentials Provider
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        // Авторизация по логину и паролю
        async authorize(credentials, req) {
          // Проверяем, есть ли данные для авторизации
          if (!credentials) return null
  
          // Ищем пользователя по email
          const values = {
            email: credentials.email,
          }
          const findUser = await prisma.user.findUnique({
            where: values,
          })
  
          // Если пользователь не найден, возвращаем null
          if (!findUser) return null
  
          // Проверяем пароль
          const isPasswordValid = await compare(credentials.password, findUser.password)
          if (!isPasswordValid) return null
  
          // Проверяем, подтвержден ли пользователь !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        //   if (!findUser.verified) return null 
  
          // Возвращаем данные пользователя
          return {
            id: findUser.id,
            email: findUser.email,
            name: findUser.fullName,
            role: findUser.role,
          }
        }
      }),
    ],
    // Секретный ключ для JWT
    secret: process.env.NEXTAUTH_SECRET,
    // Стратегия сессии
    session: {
      strategy: 'jwt',
    },
    // Callbacks
    callbacks: {
      // Callback для авторизации
      async signIn({ user, account }) {
        try {
          // Если авторизация по логину и паролю, возвращаем true
          if (account?.provider === 'credentials') {
            return true
          }
  
          // Если нет email, возвращаем false
          if (!user.email) return false
  
          // Ищем пользователя по email или providerId
          const findUser = await prisma.user.findFirst({
            where: {
              OR: [
                { provider: account?.provider, providerId: account?.providerAccountId },
                { email: user.email },
              ],
            },
          })
  
          // Если пользователь найден, обновляем его данные
          if (findUser) {
            await prisma.user.update({
              where: {
                id: findUser.id,
              },
              data: {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
            })
            return true
          }
  
          // Если пользователь не найден, создаем нового
          await prisma.user.create({
            data: {
              email: user.email,
              fullName: user.name || 'User #' + user.id,
              password: hashSync(user.id.toString(), 10),
              verified: new Date(),
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })
          return true
        } catch (error) {
          console.error('Error [SIGNIN]', error)
          return false
        }
      },
      // Callback для JWT
      async jwt({ token }) {
        if (!token.email) return token
        // Ищем пользователя по email
        const findUser = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        })
  
        // Если пользователь найден, добавляем его данные в токен
        if (findUser) {
          token.email = findUser.email
          token.name = findUser.fullName
          token.id = String(findUser.id)
          token.role = findUser.role
        }
  
        return token
      },
      // Callback для сессии
      session({ session, token }) {
        if (session?.user) {
          session.user.id = token.id
          session.user.role = token.role
        }
        return session
      },
    },
  }
