import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import {SortPopUp} from './sort-popup';
import { Category } from '@prisma/client';

interface Props {
    className?: string
    categoryActiveId?: number
    categories: Category[]
}

export const TopBar: React.FC<Props> = ({className, categories}) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
        <Container className='flex justify-between'>
            <Categories items={categories}/>
            <SortPopUp />
        </Container>
    </div>
  );
};

