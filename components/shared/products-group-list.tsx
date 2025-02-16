'use client'
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import {useIntersection} from 'react-use'
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '@/@types/prisma';
import { sortProductsStore } from '@/store';
import { sortProducts } from '@/lib/sortProducts';

interface Props {
    className?: string
    items?: ProductWithRelations[]
    title: string
    categoryId: number
    listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({className, items, title, categoryId, listClassName}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
    const [direction, option] = sortProductsStore(state => [state.direction, state.option])
    const [filteredItems, setFilteredItems] = useState<ProductWithRelations[]>([])


    // для обновления state активного просматриваемого блока
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 1,
    })

    useEffect(() => {
        if (intersection?.isIntersecting) { // если блок в зоне видимости 
            setActiveCategoryId(categoryId) // устанавливаем id просматриваемого блока
        }
    }, [categoryId, title, intersection?.isIntersecting])

    useEffect(() => {
        setFilteredItems(sortProducts(items!, direction, option))
        console.log('effect', direction, option);
    }, [direction, option, items])


  return (
    <div className={cn('', className)} id={title} ref={intersectionRef}>
        <Title text={title} size='lg' className='font-extrabold mb-5'/>

        <div className={cn('flex flex-wrap gap-x-16 gap-y-10', listClassName)}>
            {filteredItems?.map((product, i) => (
                <ProductCard 
                description='ОПИСАНИЕ ПРОДУКТА'
                id={product.id} 
                key={i}
                name={product.name}
                price={product.items[0].price} // у каждого продукта есть 3 вариации по размеру с ценами
                imageUrl={product.imageUrl}
                ingredients={product.ingredients}/>
            ))}
    
        </div>
    </div>
  );
};
