import React from 'react';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';

interface Props {
  className?: string
  imageUrl: string
  name: string
  price: number;
  active?: boolean
  id: number
  onClick?: () => void
}

export const IngredientItem: React.FC<Props> = ({className, imageUrl,id, name, price, active, onClick}) => {
  return (
    <div className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
    {'border border-primary': active},
    className)} onClick={() => onClick?.()}>
        
        {active && <CircleCheck className='absolute top-2 right-2 text-primary'/>}
        <img src={imageUrl} width={110} height={110} alt={name}/>
        <span className='text-xs mb-1'>{name}</span>
        <span className='text-xs mb-1'>{price} MDL</span>
    </div>
  );
};
