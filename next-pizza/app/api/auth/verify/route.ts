import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";


export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code')

        if (!code) {
            return NextResponse.json({ error: 'Code not found' }, { status: 400 })
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {code}
        })

        if (!verificationCode) return NextResponse.json({ error: 'Неверный код'}, {status : 400})

        await prisma.user.update({
            where: {id: verificationCode.userId},
            data: {verified: new Date()} // подтверждаем аккаунт
        })

        await prisma.verificationCode.delete({ // удаляем код подтверждения
            where: {id: verificationCode.id}
        })

        return NextResponse.redirect(new URL('/?verified', req.url))

    } catch (error) {
        console.error(error)
        console.log('Error [VERIFY_GET] server error', error)
    }
}