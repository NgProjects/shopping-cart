import { Injectable } from "@nestjs/common";
import { ProductMapper } from "../../../components/product/mapper/product.mapper";
import { Cart } from "../cart.entity";
import { CartItemDto } from "../dto/cart-item.dto";

@Injectable()
export class CartMapper {

    constructor(public productMapper : ProductMapper){}

    public mapToCartDto(cart : Cart) : CartItemDto {

        const cartItem = new CartItemDto();
        
        cartItem.product = this.productMapper.mapFromEntityToDto(cart.product);
        cartItem.quantity = cart.quantity;
        cartItem.cartId = cart.id;

        return cartItem;
    }

}