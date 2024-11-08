import { prisma } from "@/prisma/prisma-client";

export default interface GetSearchParams {
    query?: string,
    sortBy?: string
    sizes?: string,
    pizzaTypes?: string
    ingredients?: string
    priceFrom?: string
    priceTo?: string
    limit?: string
    page?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000;

export const findPizzas = async (params: GetSearchParams) => {
    // 'sizes=1,2,3' приходит с url и нужно его в формат ['1', '2', '3'] 
    const sizes =  params?.sizes?.split(',').map(Number)
    const pizzaTypes =  params?.pizzaTypes?.split(',').map(Number)
    const ingredientsIdArr =  params?.ingredients?.split(',').map(Number)

    const minPrice =  Number(params.priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice =  Number(params.priceTo) || DEFAULT_MAX_PRICE

    const categories = await prisma.category.findMany({
        include: {//include- добавляет связь - данные на 1 уровень
            products: { // products - название связи
                orderBy: {
                    id: 'desc'
                },
                where: {
                    ingredients: ingredientsIdArr ? {
                        some: { // поиск по id в БД который есть в ingredientsIdArr[]
                            id: {
                                in: ingredientsIdArr
                            },
                        },
                    } : undefined,
                    items: {
                        some:{ // if в бд есть пицца с таким размером то выводим ее
                            size: { 
                                in: sizes
                            },
                            pizzaType: {
                                in: pizzaTypes
                            },
                            price: {
                                gte: minPrice, // price >= minPrice
                                lte: maxPrice // price <= maxPrice
                            },
                        },
                    },  
                },
                include: {// include добавит сущности которые нужны
                    ingredients: true,
                    items: {
                        where: {
                            price: {
                                gte: minPrice, // price >= minPrice
                                lte: maxPrice // price <= maxPrice
                            },
                        },
                        orderBy: {
                            price: 'asc'
                        }
                    }
                }
            }
        }
    })

    return categories
}

