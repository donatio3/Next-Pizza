import React from 'react';
import { cn } from '@/lib/utils';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '../ui';
import { Skeleton } from '../ui/skeleton';

interface Props {
  className?: string
  totalAmount: number
  loading?: boolean
}


const VAT = 15;
const DELIVERY_PRICE = 250;



export const CheckoutSidebar: React.FC<Props> = ({className,loading, totalAmount}) => {
    const vatPrice: number = (totalAmount * VAT) / 100 // налог
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE

  return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Итого:</span>
                {loading ? <Skeleton className='h-11 w-48 '/> : <span className="h-11 w-48 text-[34px] font-extrabold">{totalPrice} ₽ </span>}
            </div>

            <CheckoutItemDetails 
                 title={
                <div className="flex items-center">
                <Package size={18}   className="mr-2 text-gray-300"/>
                Cтоимость корзины: 
                </div>
        } value={loading ? <Skeleton className='h-6 w-16 rounded-[6px] '/> : `${totalAmount} ₽`} className="mt-10"/>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                    <Percent size={18}   className="mr-2 text-gray-300"/>
                    Налоги:
                </div>   
            } value={loading ? <Skeleton className='h-6 w-16 rounded-[6px] '/> : `${vatPrice} ₽`} className="mt-10"/>
            <CheckoutItemDetails title={
                <div className="flex items-center">
                <Truck size={18} className="mr-2 text-gray-300"/>
                Доставка:
            </div>  
            } value={loading ? <Skeleton className='h-6 w-16 rounded-[6px] '/> : `${DELIVERY_PRICE} ₽`} className="mt-10"/>

            <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Перейти к оплате
                <ArrowRight className="w-5 ml-2" />
            </Button>

        </WhiteBlock>
  );
};
