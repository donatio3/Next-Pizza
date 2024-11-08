import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || '';
    // находим нужный продукт с помощью query 
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query, // ищет хотя бы часть имени - includes()
                mode: 'insensitive', // чувствительность к регистру
            } // name: query - строгое сравнение (===)
        },
        take: 5 // Верни 5 штук
    })

    return NextResponse.json(products);
}

// api/products/search?query=пицца