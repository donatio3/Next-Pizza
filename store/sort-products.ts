import { ProductWithRelations } from "@/@types/prisma";
import { ISortOption, SortDirection } from "@/hooks/use-sorting";
import { sortProducts } from "@/lib/sortProducts";
import { create } from "zustand";



export interface sortProducts {
    loading: boolean;
    error: boolean;
    filteredItems: ProductWithRelations[];
    direction: SortDirection
    option: ISortOption
    /* Запрос на обновление количества товара */
    changeDirection: () => void
    changeOption: (val: ISortOption) => void
    setFilteredItems: () => void
    setItems: (items: ProductWithRelations[]) => void
}
  



export const sortProductsStore = create<sortProducts>()((set, get) => ({
    loading: false,
    error: false,
    filteredItems: [],
    direction: 'toDown',
    option: 'popularity',


    changeDirection: () => {
        if (get().direction === 'toDown') set({direction: 'toUp'})
        else set({direction: 'toDown'})
        console.log('changeDirection');
    },

    changeOption: (val: ISortOption) => {
        set({option: val})
        console.log('change option', val);
    },

    setFilteredItems: () => {
        set({filteredItems: sortProducts(get().filteredItems, get().direction, get().option)})
    },

    setItems: (items) => {
        set({filteredItems: items})
    }
   
}))