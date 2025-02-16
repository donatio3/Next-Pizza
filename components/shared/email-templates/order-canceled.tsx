import React from 'react';
import { cn } from '@/lib/utils';
import { CartItemDTO } from '@/services/dto/cart.dto';

interface Props {
    orderId: number;
    items: CartItemDTO[]
}

export const OrderCanceledTemplate: React.FC<Props> = ({orderId, items}) => {
  return (
    <>
         <p>Ваш заказ # {orderId} отменен ❌. Попробуйте еще раз, Список товаров:</p>

        
        <hr />

        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    {item.productItem.product.name} | {item.productItem.price} MDL x {item.quantity} шт. = 
                    {item.productItem.price * item.quantity} MDL
                </li>
            ))}
        </ul>
    </>
  );
};
