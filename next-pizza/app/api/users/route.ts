import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany() // получаем все users из бд
    
    return NextResponse.json(users) // возвращаем все users
}

export async function POST(req: NextRequest) {
    const data = await req.json() // записываем данные из запроса в data

    const user = await prisma.user.create({ //создание нового user на бд
        data 
    })

    return NextResponse.json(user) // возвращаем созданный user
}
