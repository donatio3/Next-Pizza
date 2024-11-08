'use client'
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import {useIntersection} from 'react-use'
import { useCategoryStore } from '@/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
    className?: string
    items?: ProductWithRelations[]
    title: string
    categoryId: number
    listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({className, items, title, categoryId, listClassName}) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)

    // для обновления state активного просматриваемого блока
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.8,
    })

    useEffect(() => {
        if (intersection?.isIntersecting) { // если блок в зоне видимости 
            setActiveCategoryId(categoryId) // устанавливаем id просматриваемого блока
        }
    }, [categoryId, title, intersection?.isIntersecting])

    

  return (
    <div className={cn('', className)} id={title} ref={intersectionRef}>
        <Title text={title} size='lg' className='font-extrabold mb-5'/>

        <div className={cn('grid flex-wrap grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-max-[200px]', listClassName)}>
            {items?.map((product, i) => (
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
