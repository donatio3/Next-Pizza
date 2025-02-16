'use client'
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, } from 'lucide-react';
import React from 'react';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ISortOption } from '@/hooks/use-sorting';
import { sortProductsStore } from '@/store';
  

interface Props {className?: string}

export const SortPopUp: React.FC<Props> = ({className}) => {
const [direction, changeOption, changeDirection] = sortProductsStore(state => [state.direction, state.changeOption, state.changeDirection, state.option])

  return (
    <div className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[54px] rounded-2xl cursor-pointer', className)}>

        <div className='mr-2' onClick={changeDirection}>
            {direction === 'toDown' 
                ? <ArrowDown className={`hover:text-[#FF5E00]`} size={22}/>
                : <ArrowUp className={`hover:text-[#FF5E00]`} size={22}/>
            }
        </div>
        

        <Select onValueChange={(val) => changeOption(val as ISortOption)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="popularity" />
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectItem value="popularity">Popularity</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
  
    </div>
  );
};

