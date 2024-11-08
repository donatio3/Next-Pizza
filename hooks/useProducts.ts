import { Api } from "@/services/api-client"
import { Product } from "@prisma/client"
import { useEffect, useState } from "react"

interface ReturnProps {
    products: Product[]
    loading: boolean
}

export const useProducts = (): ReturnProps => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { 

        // async function fetchProducts() {
        //     setLoading(true)
        //     try {
        //         const productsFetched = await Api.products.getProducts()
        //         setProducts(productsFetched)
        //     } catch (error) {
        //         console.log(error, '123333333333333333')
        //     }
        //     finally {
        //         setLoading(false)
        //     }
        // }
        // fetchProducts()
    }, [])

    return {products, loading}

}