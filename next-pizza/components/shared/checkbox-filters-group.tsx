'use client'
import React, { ChangeEvent, useState } from 'react';
import { cn } from '@/lib/utils';
import { FilterChecboxProps, FilterCheckbox } from './filter-Checkbox';
import { Input } from '../ui/input';

type Item = FilterChecboxProps // checkbox
// КОМПОНЕНТ ФИЛЬТРОВ ИНГРИДИЕНТОВ
interface Props {
    title: string;
    items: Item[]; // ВСЕ ЧЕКБОКСЫ
    defaultItems?: Item[] // 6 ШТУК ЧЕКБОКСОВ
    limit?: number;
    searchInputPlaceholder?: string;
    onClickCheckBox?: (id: string) => void
    defaultValue?: string[];
    className?: string
    selected: Set<string>
    name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 5,
        searchInputPlaceholder = 'Поиск...',
        className,
        selected,
        onClickCheckBox,
        name
    }) => {
    const [showAll, setShowAll] = useState(false)
    const [searchValue, setSearchValue] = useState('')    

    const list = showAll 
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((a: FilterChecboxProps, b: FilterChecboxProps): number => {
        if (selected.has(a.value) && !selected.has(b.value)) return -1
        if (!selected.has(a.value) && selected.has(b.value)) return 1
        return 0
    })
    : (defaultItems || items).slice(0, limit)

  return (
    <div className={cn('', className)}>
        <p className='font-bold mb-3'>{title}</p>

       {showAll && 
        <div className="mb-5">
            <Input placeholder={searchInputPlaceholder} onChange={(e: ChangeEvent) => setSearchValue((e.target as HTMLInputElement)?.value)} value={searchValue} 
            className='bg-gray-50 border-none'/>
        </div>
       }

        <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>

            {list.map((item, index) => (
                <FilterCheckbox 
                key={index} 
                name={name}
                text={item.text} 
                value={item.value} 
                endAdornment={item.endAdornment} 
                checked={selected?.has(item.value)} 
                onCheckedChange={() => {
                    onClickCheckBox?.(item.value)
                }}/>
            ))}
        </div>

        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4': ''}>
                <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>{showAll ? 'Скрыть' : '+ Показать все'}</button>
            </div>
        )}
    </div>
  );
};
