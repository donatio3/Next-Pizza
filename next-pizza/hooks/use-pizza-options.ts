import { Variant } from '@/components/shared/group-variants';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getAvailablePizzaSizes } from '@/lib/get-available-pizza-sizes';
import { ProductItem } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react'
import { useSet } from 'react-use';


interface ReturnProps {
    size: PizzaSize
    type: PizzaType
    setSize: (size: PizzaSize) => void
    availablePizzasSizes: Variant[]
    setType: (type: PizzaType) => void
    selectedIngredients: Set<number>
    currentItemId?: number
    addIngredient: (id: number) => void
}
    // TODO: нужно сделать так чтобы при выборе несуществующей пиццы, сбрасывалась на первый вариант

export const usePizzaOptions = ( items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))
    
    const availablePizzasSizes = getAvailablePizzaSizes(type, items)
    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id

    useEffect(() => {
        const isAvailableSize = availablePizzasSizes?.find((item) => String(item.name) === String(size) && !item.disabled)
        const availableSize = availablePizzasSizes?.find((item) => !item.disabled)

        // если пицца не доступна, то устанавливаем первый вариант
        // если доступна - оставляем тот же размер проверя размер и disbaled
        if (!isAvailableSize && availableSize) { 
            setSize(Number(availableSize.name) as PizzaSize)
        } 
    }, [type])


    return useMemo(() => {
        return {
            size,
            type,
            setSize,
            setType,
            selectedIngredients,
            availablePizzasSizes,
            currentItemId,
            addIngredient
        }
    }, [size,
        type, selectedIngredients,
        availablePizzasSizes,
        currentItemId,])
 // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
}