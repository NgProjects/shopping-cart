import { ProductDto } from "../../../components/product/dto/product.dto";

export class CartItemDto{

    product: ProductDto;
    
    quantity: number;

    cartId: number;

}