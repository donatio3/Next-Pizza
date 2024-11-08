"use client"
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Container } from './container'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import toast from 'react-hot-toast'
import {  useSession } from 'next-auth/react'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals'
import { useRouter, useSearchParams } from 'next/navigation'
 
type Props = {
    className?: string
    hasSearch?: boolean
    hasCart?: boolean
}

export const Header: React.FC<Props> = ({className, hasSearch = true, hasCart = true}) => {
    const searchParams = useSearchParams()
    const {data} = useSession()
    const [openAuthModal, setOpenAuthModal] = useState(false)
    const router = useRouter()

    useEffect(() => {
        let toastMessage = ''
        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен! Информация о заказе отправлена вам на почту'
        }

        if (searchParams.has('verified')) { 
            toastMessage = 'Ваш аккаунт подтвержден!'
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {duration: 3000,})
            }, 1000)
        }
    }, [])

  return (
    <div className={cn(className)}>
        <Container className='flex items-center justify-between py-8'>
            {/* ЛЕВАЯ ЧАСТЬ */}

            <Link href={'/'}>
                <div className='flex items-center gap-4'>
                    <Image src='/logo.png' alt='logo' width={32} height={32}/>
                    <div>
                        <h1 className='text-2xl uppercase from-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>
            </Link>

            {/* ПОИСК */}
            
            {hasSearch && 
                 <div className={'mx-10 flex-1'}>
                    <SearchInput/>
                 </div>
            
            }
           



            {/* ПРАВАЯ ЧАСТЬ */}

            <div className="flex items-center gap-1">
                <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(prev => !prev)}/>
                <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}/>


                <div>
                    {hasCart && <CartButton/>}
                </div>
            </div>

        </Container>
    </div>
    
  )
}

