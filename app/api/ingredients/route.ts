import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

// нужен для получения ингредиентов с бэкенда
export async function GET() {
    const ingredients = await prisma.ingredient.findMany()

    return NextResponse.json(ingredients)
}