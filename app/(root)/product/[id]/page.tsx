import { Container, ProductForm } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';


export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true
                        },
                    },
                },
            },
            items: true,
        },
    }); 
  

  if (!product) {
    return notFound();
  }

 
  return (
    <Container className="flex my-10 justify-center gap-x-10">
        <ProductForm className='gap-x-40' product={product} />      
    </Container>
  );
}   