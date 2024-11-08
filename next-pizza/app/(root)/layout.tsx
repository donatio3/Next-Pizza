import { Header } from '../../components/shared/header';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
};

console.log(Header, 'SAD')

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      <Suspense> 
        <Header/>
      </Suspense>
      {children} 
      {modal}
    </main>
  );
}