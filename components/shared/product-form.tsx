'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  className?: string
  product: ProductWithRelations
  onSubmit? : VoidFunction
  isOpenModal?: boolean
}

export const ProductForm: React.FC<Props> = ({className, product, onSubmit: _onSubmit, isOpenModal}) => {
    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem,  state.loading])
    const firstItem = product.items[0] 
    const isPizzaForm = Boolean(product.items[0].pizzaType) // если это пицца?
  
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        try {
            const itemId = productItemId ?? firstItem.id
            await addCartItem({
                productItemId: itemId,
                ingredients
            })
            toast.success(product.name + ' добавлен(a/o/ы) в корзину')
            _onSubmit?.()   
    
        } catch (error) {
            console.error(error)
            toast.error('Не удалось добавить продукт в корзину')
        }
    }

  return (
    
    <>
         {  
                isPizzaForm 
                ? <ChoosePizzaForm 
                    className={className}
                    loading={loading}
                    items={product.items} product={product}
                    imageUrl={product.imageUrl}
                    name={product.name} ingredients={product.ingredients} 
                    onSubmit={(id, ingredients) => onSubmit(id, ingredients)} />
                : <ChooseProductForm 
                    className={className}
                    loading={loading}
                    items={product.items} product={product}
                    imageUrl={product.imageUrl} 
                    name={product.name} ingredients={product.ingredients}
                    price={firstItem.price} onSubmit={onSubmit}/>
            }
    

    </>
  );
};
