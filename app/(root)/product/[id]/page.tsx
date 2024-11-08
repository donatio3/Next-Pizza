import { Container, ProductForm } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';


export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
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
    <Container className="flex my-10 justify-center">
        <ProductForm product={product} />      
    </Container>
  );
}   