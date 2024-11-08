import React from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { ProductWithRelations } from '@/@types/prisma';


interface Props {
    imageUrl: string;
    name: string;
    items: any[];
    ingredients: any[]
    loading?: boolean;
    onSubmit?: VoidFunction;
    price: number;
    className?: string;
    product: ProductWithRelations
}
  

/**
 * ФОРМА ВЫБОРА ПРОДУКТА
 */
export const ChooseProductForm: React.FC<Props> = ({className, imageUrl, name, loading, price, onSubmit}) => {
    

  return (
   <>
        <div className={cn(className, 'flex flex-1')}>
            <div className='flex items-center justify-center flex-1 relative w-full'>
                <img src={imageUrl} alt={name} className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'/>
            </div>
        </div>

        <div className='w-[490px] bg-[#FCFCFC] p-7'>
            <Title text={name} size='md' className='font-extrabold mb-1'/>

            <p className='text-gray-400'>{}</p>

            <Button loading={loading} onClick={() => onSubmit?.()} className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
                Добавить в корзину за {price} руб
            </Button>
        </div>
    </>
  );
};
