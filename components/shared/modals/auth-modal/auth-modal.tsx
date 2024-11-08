'use client'
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}
export const AuthModal: React.FC<Props> = ({className, onClose, open}) => {
    const [type, setType] = useState<'login' | 'register'>('login')
    
    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login')
    }
    const handleClose = () => {
        onClose();
    };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className={cn('w-[450px] bg-white p-10', className)}>
            
            {type === 'login' ? (
                <LoginForm onClose={handleClose} />
            ) : (
                <RegisterForm onClose={handleClose} />
            )}                

            <hr />
            <div className='flex gap-2'>
                <Button  
                onClick={() => 
                    signIn('github', {
                     callbackUrl: 'https://next-pizza-3g4ex5y10-dmitris-projects-75943609.vercel.app/api/auth/callback/github',
                     redirect: true})
                    } 
                variant='secondary' 
                className='gap-2 h-12 p-2 flex-1'>
                        <img src="https://github.githubassets.com/favicons/favicon.png" alt="github" />
                        Github
                </Button>

                <Button  
                onClick={() => 
                    signIn('google', {
                     callbackUrl: 'https://next-pizza-3g4ex5y10-dmitris-projects-75943609.vercel.app/api/auth/callback/google',
                     redirect: true})
                    } 
                variant='secondary' 
                className='gap-2 h-12 p-2 flex-1'>
                        <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="google" />
                        Google
                </Button>
            </div>
            <Button variant='secondary' className='gap-2 h-12 p-2 flex-1' onClick={onSwitchType}>
                    <h2 className='text-lg text-center'>{type === 'login' ? 'Зарегистрироваться' : 'Войти'}</h2>
            </Button>
        </DialogContent>
    </Dialog>
  );
};
