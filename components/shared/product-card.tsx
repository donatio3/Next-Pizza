import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
import { useCartStore } from '@/store';

export interface PropsProductCard {
    className?: string
    id: number;
    name: string;
    price: number;
    imageUrl: string
    description: string
    ingredients?: Ingredient[]
}

export const ProductCard: React.FC<PropsProductCard> = ({className, id, name, price, imageUrl, description, ingredients}) => {
    
    return (
    <div className={cn('w-[350px]', className)}>
        <Link href={`/product/${id}`}>
            <div className='flex  justify-center p-6 bg-secondary rounded-lg h-[260px]'>
                <img className='w-max-[215px] h-max-[215px]' src={imageUrl} alt={name} />
            </div>
            
            <Title text={name} size='sm' className='mb-1 mt-3 font-bold'/>

            <p className='text-sm text-gray-400'>{ingredients?.map((ingredient) => ingredient.name).join(', ')}</p>

            <div className='flex relative items-center mt-4'>
                <span className='text-[20px]'>
                    От <b>{price} MDL</b>
                </span>

                <Button variant='secondary' className='text-base font-bold  absolute right-0'>
                    Добавить

                    <Plus size={20} className='ml-1'>
                    </Plus>
                </Button>
            </div>
        </Link>
    </div>
  );
};
