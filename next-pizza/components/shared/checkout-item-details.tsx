import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  title?: React.ReactNode
  value?: React.ReactNode
}

export const CheckoutItemDetails: React.FC<Props> = ({title, value, className}) => {
  return (
    <div className={cn('', className)}>
        <div className="flex my-4">
            <span className="flex flex-1 text-lg text-neutral-500 ">
                {title} 
                <div className="flex-1 border-b border-neutral-200 -top-1 mx-2"/>
            </span>

            <span className="font-bold text-lg">{value}</span>
        </div>
    </div>
  );
};
