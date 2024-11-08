import { SegmentParams } from '@/@types/prisma';
import { ChooseProductModal } from '@/components/shared/modals';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export interface PageProps {
    params?: Promise<SegmentParams>;
    searchParams?: Promise<SegmentParams>;
  }
  export default async function ProductModalPage({ params }: PageProps) {
    const resolvedParams = await params;

    if (!resolvedParams) {
        return notFound();
    }
    
    const { id } = resolvedParams;
    
    const product = await prisma.product.findFirst({
      where: {
        id: Number(id),  // Преобразуем обратно в число для использования
      },
      include: {
        ingredients: true,
        items: true,
      },
    });

    if (!product) {
        return notFound();
    }
  
    return <ChooseProductModal product={product}></ChooseProductModal>;
  }
