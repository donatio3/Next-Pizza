import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {items: ProductItem[]; ingredients: Ingredient[]}
export type SegmentParams = { [param: string]: string | number | string[] | undefined };
