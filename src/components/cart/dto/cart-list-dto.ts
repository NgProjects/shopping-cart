import { CartItemDto } from "./cart-item.dto";

export class CartListDto{
    cartItems : CartItemDto[];
    totalAmount: number;
}