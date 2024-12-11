import { Cart, Favorite, Product } from '@prisma/client';

export interface IProductWithCartAndFav extends Product {
  cart?: Cart[];
  favorites: Favorite[];
}
