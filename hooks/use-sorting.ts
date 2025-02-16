'use client'
import { sortProductsStore } from "@/store"
import {  useMemo,  useState } from "react"

enum SortOption {
    popularity = 'popularity',
    price = 'price',
    newest = 'newest'
}

export type SortDirection = 'toUp' | 'toDown' 
export type ISortOption = keyof typeof SortOption

export interface Sort {
    sortDirection: SortDirection
    sortOption: ISortOption
}

interface ReturnProps extends Sort {
    setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>
    setSortOption: (val: ISortOption) => void
    onChangeDirection: () => void
}

// export const useSorting = (): ReturnProps => {
//     const [ changeDirection ] = sortProductsStore(state => [ state.changeDirection, state.setFilteredItems]);
//     const [sortOption, setSortOption] = useState<ISortOption>( 'popularity')
    
//     const [sortDirection, setSortDirection] = useState<SortDirection>('toDown')

//     const onChangeDirection = () => {
//         changeDirection()
//         // if (sortDirection === 'toDown') setSortDirection('toUp')
//         // else setSortDirection('toDown')
//     }
    
//     const onSetSortOption = (val: ISortOption) => {
//         // setFilteredItems()
//         // setSortOption(val)
//     }

//     return useMemo(
//         () => ({
//             sortDirection,
//             setSortDirection,
//             sortOption,
//             setSortOption: onSetSortOption,
//             onChangeDirection
//         }), [sortDirection, sortOption]
//     )
// }
