import { Stories, ProductGroupList, Container, Filters , TopBar, Title } from "../../components/shared";
import { Suspense } from "react";
import GetSearchParams, { findPizzas  } from "../../lib/find-pizzas";

// Серверный компонент страницы
export default async function Home({searchParams}: {searchParams: GetSearchParams}) {
    const categories = await findPizzas(await searchParams)
    
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>

            <TopBar categories={categories.filter((category) => category.products.length > 0)} className="mb-6" />

            <Stories/>

            <Container className="pb-14">
                <div className="flex gap-[80px]">
                    {/* Клиентский компонент фильтров */}
                    <Suspense> 
                        <Filters />
                    </Suspense>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 gap-16">
                            {
                                categories.map((category) => (
                                    category.products.length > 0 && (
                                        <ProductGroupList className="w-[100%] " key={category.id} 
                                            categoryId={category.id}
                                            title={category.name} 
                                            items={category.products} />
                                    )
                                ))
                            }
                    </div>
                </div>
                </div>
            </Container>
        </>
    );
}

