import { PizzaSize, PizzaType } from '@/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'

/**
 * функция для подсчета общей стоимости пиццы
 * @param items список вариации
 * @param ingredients список ингридиентов
 * @param type тип теста выбрайной пиццы
 * @param size размер выбранный 
 * @param selectedIngredient выбранные ингридиенты
 * @returns number - общую стоимость
 */

export const calcTotalPizzaPrices = (items: ProductItem[], ingredients: Ingredient[], type: PizzaType, size: PizzaSize, selectedIngredient: Set<number>) => {
    const pizzaPrice = 
    items.find((item) => item.pizzaType === type && item.size === size)?.price || 0 // находит пиццу по типу и возвращает цену
    const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredient.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0)
    
    
    
    return pizzaPrice + totalIngredientsPrice
}