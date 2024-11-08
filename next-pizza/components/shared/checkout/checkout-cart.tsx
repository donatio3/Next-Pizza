import React from 'react';
import { WhiteBlock } from '../white-block';
import { ChceckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/lib';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { CartStateItem } from '@/lib/get-cart-details';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';

interface Props {
  className?: string
  items: CartStateItem[]
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
  onClickRemoveItem: (id: number) => void
  loading?: boolean
}

export const CheckoutCart: React.FC<Props> = ({className, items, loading, onClickCountButton, onClickRemoveItem}) => {
  return (
        <WhiteBlock title="1. корзина" className={className}>

            <div className="flex flex-col">
 
                {loading 
                    ? ([...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />))
                    
                    :items.map((item) => (
                        <ChceckoutItem id={item.id} 
                            key={item.id} 
                            imageUrl={item.imageUrl} 
                            details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)                                        }
                            name={item.name} 
                            price={item.price}  
                            quantity={item.quantity}  
                            disabled={item.disabled}
                            className={''}
                            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                            onClickRemove={() => onClickRemoveItem(item.id)}/>
                    ))
                }

              
            </div>
        </WhiteBlock>
  );
};
