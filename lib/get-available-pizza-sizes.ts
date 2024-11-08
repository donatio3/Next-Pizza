import { Variant } from '@/components/shared/group-variants'
import { pizzaSizes, PizzaType } from '@/constants/pizza'
import { ProductItem } from '@prisma/client'


export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
    // если мы нажали на тип теста-тонкое то запишутся пиццы у которых есть тонкое тесто
    // оставляем все пиццы по типу
    const filteredPizzaByType = items.filter((item) => item.pizzaType == type)
    const availablePizzasSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzaByType.some((pizza) => Number(pizza.size) === Number(item.name))
    }))
    // если один размер пиццы есть true, и передаем этот массив в groupVariants

  return availablePizzasSizes
}