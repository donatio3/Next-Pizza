import { Container, Header } from "@/components/shared";
import { Suspense } from "react";

export const metadata = {
    title: 'Next Pizza | Корзина',
    description: 'Generated by Next.js',
  };
  
  export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <main className="min-h-screen bg-[#F4F1EE]">
            <Suspense>
                <Container>
                    <Header hasCart={false} hasSearch={false} className="border-gray-200 border-b-gray-200"></Header>
                    {children}
                </Container>
            </Suspense>
        </main>
  }
  