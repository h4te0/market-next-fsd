import { IProductWithCartAndFav } from '@/entities/product';
import { Cart } from '@prisma/client';

export interface ICartItemWithProduct extends Cart {
  product: IProductWithCartAndFav;
}
