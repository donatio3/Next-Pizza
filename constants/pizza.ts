export const mapSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;

export const mapPizzaType = {
    1: 'Традиционная',
    2: 'Тонкая',
} as const;

export const pizzaSizes = Object.entries(mapSize).map(([name, value]) => ({
    value,
    name, 
})) // [{value: 10, name: 'Маленькая'}, {value: 20, name: 'Средняя'}, {value: 30, name: 'Большая'}]

export const pizzaTypes = Object.entries(mapPizzaType).map(([name, value]) => ({
    value,
    name, 
}))


export type PizzaSize = keyof typeof mapSize // 10, 20, 30
export type PizzaType = keyof typeof mapPizzaType // 1