'use client'
import React, { useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { Input } from '../ui/input';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useQueryFilters, useIngredients, useFilters } from '@/hooks/index';

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({className}) => {
    const {loading, ingredients } = useIngredients() // хук для ингридиентов
    const filters = useFilters()//хук для фильтрации в useSet мы записываем с url searchPar.
    useQueryFilters(filters) // хук вводит в url значения checked-checbox

    const items = useMemo(() => 
        ingredients.map(ingredient => ({
            text: ingredient.name.toString(), 
            value: ingredient.id.toString()
        })), 
        [ingredients]
    );    

    console.log('render filter')

    
    const updatePrices = useCallback((valueFrom: number, valueTo: number) => {
        filters.setPrices('priceFrom', valueFrom || 0);
        filters.setPrices('priceTo', valueTo || 1000);
    }, [filters]);

    return (
        <div className={cn('', className)}>
            <Title text="Фильтрация" size='sm' className='mb-5 font-bold'/>
    
            {/* ВЕРХНИЕ ЧЕКБОКСЫ */}
            <CheckboxFiltersGroup title='Тип теста' className='mb-5' 
            limit={6}
            name='pizzaTypes'
            items={[
                {text: 'Тонкое', value: '1'},
                {text: 'Традиционное', value: '2'},
            ]}
            onClickCheckBox={filters.setPizzaTypes}
            selected={filters.pizzaTypes}/>
            
            <CheckboxFiltersGroup title='Размеры' className='mb-5' 
            limit={6}
            name='sizes'
            items={[
                {text: '20 см', value: '20'},
                {text: '30 см', value: '30'},
                {text: '40 см', value: '40'},
            ]}
            onClickCheckBox={filters.setSizes}
            selected={filters.sizes}/>
    
            {/* Фильтр цен */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Цена от и до:</p>
    
                <div className='flex gap-3 mb-5'>
                    <Input type='number' placeholder='0' min={0} max={1000} 
                    value={Number(filters.prices.priceFrom)}
                    onChange={(e) => filters.setPrices('priceFrom', Number((e.target as HTMLInputElement)?.value)) }
                    ></Input>
                    <Input type='number' placeholder='1000' min={100} max={1000} 
                    value={Number(filters.prices.priceTo)}
                    onChange={(e) => filters.setPrices('priceTo', Number((e.target as HTMLInputElement)?.value)) }
                    ></Input>
                </div>
    
                <RangeSlider max={1000} min={0} step={10} 
                onValueChange={([priceFrom, priceTo]) => updatePrices(priceFrom, priceTo)}
                value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}/>
            </div>
    
            {/* Ингридиенты */}
    
            {loading 
            ? <p>Загрузка...</p>
    
            : <CheckboxFiltersGroup title='Ингридиенты' className='mt-5' 
            limit={6}
            name='ingredients'
            defaultItems={items.slice(0, 6)}
            items={ingredients.map(ingredient => ({text: ingredient.name.toString(), value: ingredient.id.toString()}))}
            onClickCheckBox={filters.setSelectedIngredients}
            selected={filters.selectedIngredients}/>
            }
    
           
        </div>
      );
};
