import { calcTotalPizzaPrices } from './calc-total-pizza-prices'
import { mapPizzaType, PizzaSize, PizzaType } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'

export const getPizzaDetails = (
    items: ProductItem[],
    ingredients: Ingredient[],
    type: PizzaType,
    size: PizzaSize,
    selectedIngredient: Set<number>
) => {
    const textDetails = ` ${size} см, ${mapPizzaType[type]} пицца, ингредиенты: ${[...selectedIngredient].map(id => ingredients.find(ingredient => ingredient.id === id)?.name).join(', ') || ''}`
    const totalPrice = calcTotalPizzaPrices(items, ingredients, type, size, selectedIngredient)
    return {
        textDetails,
        totalPrice
    }
}