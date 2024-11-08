'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { cn, getCartItemDetails } from '@/lib';
import { PizzaSize, PizzaType  } from '@/constants/pizza';
import Image from 'next/image';
import { Title } from './title';
import { useCart } from '@/hooks';

// этот компонент будет получать children
export const CartDrawer: React.FC<React.PropsWithChildren> = ({children}) => {
    const {totalAmount, items, loading, fetchCartItems, removeCartItem, updateItemQuantity} = useCart()
    const [redirecting, setRedirecting] = useState(false) 

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuanity = type === 'plus' ? quantity + 1 : quantity - 1
        updateItemQuantity(id, newQuanity)
    }

    const onClickRemoveItem = (id: number) => {
        removeCartItem(id)
    }
    
  return (
    <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
            <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
                {totalAmount > 0 && 
                    <SheetHeader>
                        <SheetTitle>
                            В корзине <span className="font-bold">{items.length} товара</span>
                        </SheetTitle>
                    </SheetHeader>
                }

                {!totalAmount && 
                    <div className='flex flex-col items-center justify-center w-72 mx-auto'>
                        <Image src='/public/empty-box.png' width={200} height={200} alt='empty box' />
                        <Title size='sm' text='Ваша корзина пуста' className='text-center font-bold my-2'/>
                        <p className=' text-center text-neutral-500 mb-5'>
                            Добавьте пиццу в корзину, чтобы она появилась здесь
                        </p>

                        <SheetClose>
                            <Button className='w-56 h-12 text-base' size='lg'>
                                <ArrowLeft className='mr-2 w-5'/>
                                Вернуться назад
                            </Button>
                        </SheetClose>

                    </div>

                }


                {/* ITEMS */}
                { totalAmount > 0 && <>  
                    <div className='-mx-6 mt-5 overflow-auto flex-1'>
                        {items.map((item) => (
                            <div key={item.id} className='mb-2'>
                            <CartDrawerItem 
                                disabled={item.disabled}
                                key={item.id}  
                                id={item.id} 
                                imageUrl={item.imageUrl}
                                details={
                                    getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)
                                }
                                name={item.name} price={item.price} quantity={item.quantity}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => onClickRemoveItem(item.id)}/>
                            </div>
                        ))}
                    </div>

                        
                    <SheetFooter className="-mx-6 bg-white p-8">
                        <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                            Итого
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>

                            <span className="font-bold text-lg">{totalAmount} ₽</span>
                        </div>

                            <Link href="/checkout">
                                <Button
                                    onClick={() => setRedirecting(true)}
                                    loading={redirecting}
                                    type="submit"
                                    className="w-full h-12 text-base">
                                    Оформить заказ
                                    <ArrowRight className="w-5 ml-2" />
                                </Button>
                            </Link> 
                    </div>
                    </SheetFooter>
                </>
                }
                
            </div>    
        </SheetContent>
    </Sheet>
  );
};
