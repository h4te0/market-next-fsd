import { IProductWithCartAndFav } from '@/entities/product';
import { Favorite, Product } from '@prisma/client';

export interface IFavoriteWithProduct extends Favorite {
  product: IProductWithCartAndFav;
}
