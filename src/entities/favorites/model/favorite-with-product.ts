import { IProductWithCartAndFav } from '@/entities/product';
import { Favorite } from '@prisma/client';

export interface IFavoriteWithProduct extends Favorite {
  product: IProductWithCartAndFav;
}
