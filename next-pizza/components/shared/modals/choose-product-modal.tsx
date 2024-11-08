'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import { useCartStore } from '@/store';
import toast from 'react-hot-toast';
import { ProductForm } from '../product-form';
import { prisma } from '@/prisma/prisma-client';

interface Props {
  product: ProductWithRelations;
  className?: string
  onSubmit?: (itemId: number, ingredients: number[]) => void
}

export const ChooseProductModal: React.FC<Props> = ({product, className}) => {
    const router = useRouter()
    const firstItem = product.items[0] 
    const isPizzaForm = Boolean(product.items[0].pizzaType) // если это пицца?
    const [addCartItem, loading, setIsOpenModal, isOpenModal] = useCartStore((state) => [state.addCartItem,  state.loading, state.setIsOpenModal, state.isOpenModal])

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
        router.replace('/')
        setIsOpenModal(false); 
    }


    // ИЗ SHADCN Dialog
  return (
    <Dialog open={Boolean(product)}> // open - нужен для открытия модального окна
        <DialogContent className='p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
            <ProductForm product={product}  onSubmit={() => router.back()}/>
        </DialogContent>
    </Dialog>
  );
};
