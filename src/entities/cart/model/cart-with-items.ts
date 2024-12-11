import { ICartItemWithProduct } from './cart-item-with-product';

export interface ICartWithItems {
  cart: ICartItemWithProduct[];
  totalCount: number;
  totalSum: number;
}
