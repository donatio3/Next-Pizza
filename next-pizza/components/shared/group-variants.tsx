'use client';
import React from 'react';
import { cn } from '@/lib/utils';

export type Variant = { //
    name: string;
    value: string;
    disabled?: boolean;
  };
  
  interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant['value']) => void; // VARIANT VALUE
    value?: Variant['value'];
    className?: string;
  }

export const GroupVariants: React.FC<Props> = ({className, items, onClick, value }) => {
  return (
    <div className={cn('flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none', className)}>
        {
            items.map((item) => (
                <button key={item.name} onClick={() => onClick?.(item.name)}
                className={cn(
                    'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                    {
                        'bg-white shadow': value === item.name,
                        'text-gray-500 opacity-50 pointer-events-none': item.disabled
                    }
                )}>
                    {item.value}
                </button>
            ))
        }   
    </div>
  );
};
