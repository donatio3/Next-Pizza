'use client'
import React from 'react';
import { cn } from '@/lib/utils';

import { PizzaImage, IngredientItem, GroupVariants } from './index';
import { Title } from './title';
import { Button } from '../ui';
import { ProductWithRelations } from '@/@types/prisma';
import { pizzaTypes, PizzaSize, PizzaType } from '@/constants/pizza';
import { ProductItem } from '@prisma/client';
import { usePizzaOptions } from '@/hooks';
import { getPizzaDetails } from '@/lib';


interface Props {
    imageUrl: string;
    name: string;
    ingredients: any[];
    items: ProductItem[];
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
    product: ProductWithRelations
}
  
export const ChoosePizzaForm: React.FC<Props> = ({className, imageUrl, name, ingredients, items, loading, onSubmit}) => {

   const {
    size, type, setSize, setType, 
    selectedIngredients, addIngredient, 
    availablePizzasSizes, currentItemId
} = usePizzaOptions(items)

   const {textDetails, totalPrice} = getPizzaDetails(items, ingredients, type, size, selectedIngredients)

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId as number, Array.from(selectedIngredients))
        }
    }

  return (
   <div className={cn(className, 'flex content-center')}>
        <PizzaImage imageUrl={imageUrl} size={size}/>

        <div className='w-[550px] bg-[#FCFCFC] p-7'>
            <Title text={name} size='md' className='font-extrabold mb-1'/>

            <p className='text-gray-400'>{textDetails}</p>

           <div className='flex flex-col gap-3 mt-5'>
                <GroupVariants
                    items={availablePizzasSizes}
                    value={String(size)}
                    onClick={value => setSize(Number(value) as PizzaSize)}
                />

                <GroupVariants
                    items={pizzaTypes}
                    value={String(type)}
                    onClick={value => setType(Number(value) as PizzaType)}
                /> 
           </div>

            <div className='bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
                <div className='mt-5 grid grid-cols-3 gap-3'>
                    {ingredients.map((ingredient: any) => (
                        <IngredientItem
                            key={ingredient.id}
                            id={ingredient.id}
                            imageUrl={ingredient.imageUrl}
                            name={ingredient.name}
                            price={ingredient.price}
                            active={selectedIngredients.has(ingredient.id)}
                            onClick={() => addIngredient(ingredient.id)}
                        />
                    ))}
            </div>
            </div>
           

            <Button loading={loading} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'
            onClick={handleClickAdd}>
                Добавить в корзину за {totalPrice} MDL
            </Button>
        </div>
    </div>
  );
};
