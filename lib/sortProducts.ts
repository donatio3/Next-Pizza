import { ProductWithRelations } from "@/@types/prisma";
import { ISortOption, SortDirection } from "@/hooks/use-sorting";

export const sortProducts = (items: ProductWithRelations[], direction: SortDirection, option: ISortOption) => {
    switch (option) {
        case 'popularity':
            console.log('POPULARITY');
            
            if (direction === 'toDown') {
                return items.sort((a,b) => b.popularity - a.popularity)
            } 
            return items.sort((a,b) => a.popularity - b.popularity)
        case 'price': 
            console.log('PRICE');
        
            if (direction === 'toDown') {
                return items.sort((a,b) => b.items[0].price - a.items[0].price)
            } 
            return items.sort((a,b) => a.items[0].price - b.items[0].price)
        case 'newest':
            console.log('NEWEST');
            
            if (direction === 'toDown') {
                return items.sort((a,b) => b.id - a.id)
            } 
            return items.sort((a,b) => b.id - a.id)
            
        default:
            return items
    }
}