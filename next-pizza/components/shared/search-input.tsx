'use client'
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Api } from '@/services/api-client';
import { Product } from '@prisma/client';
import { useDebounce } from 'react-use';

interface Props {className?: string}

export const SearchInput: React.FC<Props> = ({className}) => {
    const [focused, setFocused] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const productRef = useRef<HTMLDivElement>(null);
    const [products, setProducts] = useState<Product[]>([])

   const handleEventClick = (e: MouseEvent) => {
        if (productRef.current && !productRef.current.contains(e.target as Node)) {
            setFocused(false)
        }                                                 
   }

   const onClickItem = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
   }    

    useDebounce(
    async () => {
        try {
            const response = await Api.products.search(searchQuery)
           setProducts(response)
        } catch (error) {
            console.log(error)
        }
        
    }, 250, [searchQuery])

    useEffect(() => {
        document.addEventListener('click', handleEventClick)

        return () => document.removeEventListener('click', handleEventClick)
    }, [])

  return (
    <>
    {focused && (<div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30'/>)}

    <div ref={productRef} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
        className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
        type="text"
        placeholder="Найти пиццу..."
        onFocus={() => setFocused(true)}
        onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12 pl-2',
            )}>    

            {products.map((product) => (
                <Link
                    onClick={() => onClickItem()}
                    key={product.id}
                    className="flex products-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                    href={`/product/${product.id}`}>
                    <img className="rounded-sm h-8 w-8" src={product.imageUrl} alt={product.name} />
                    <span>{product.name}</span>
              </Link>
            ))}
        </div>

    </div>
    </>
  );
};
