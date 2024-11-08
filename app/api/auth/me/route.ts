import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma-client"
import { getUserSession } from '../../../../lib/get-user-session';
import { getServerSession } from "next-auth";
import { authOptions } from "@/constants/auth-options";


export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
    try {
        const user = await getServerSession(req, res, authOptions)

        if (!user) {    
            return NextResponse.json({user: null}, {status: 401})
        }

        const data = await prisma.user.findUnique({
            where: {id: Number(user.user.id)},
            select: {
                fullName: true,
                email: true,
                password: false
            }
        })

        return NextResponse.json(data)

    } catch (error) {
        return NextResponse.json({error}, {status: 500})
    }
}