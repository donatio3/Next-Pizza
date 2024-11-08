'use client';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"
import NextTopLoader from 'nextjs-toploader'
interface Props {
  className?: string
}


// МОЖНО ВСЕ ОСТАВИТЬ В LAYOUT, а не делать этот компонент
export const Providers: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <>
         <SessionProvider>
            {children}
        </SessionProvider>
        <Toaster/>
        <NextTopLoader/>
    </>
  );
};
