import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiError } from '../errors/APIError';
import { ProductService } from '../product/product.service';
import { User } from '../user/user.entity';
import { Cart } from './cart.entity';
import { CartRepository } from './cart.repository';
import { AddToCartRequest } from './dto/cart-request.dto';
import { CartListDto } from './dto/cart-list-dto';
import { CartItemDto } from './dto/cart-item.dto';
import { CartMapper } from './mapper/cart.mapper';
import { CartItemCountUpdateDto } from './dto/item-count-update.dto';

@Injectable()
export class CartService {

    constructor(
        private readonly productService: ProductService,
        @InjectRepository(Cart) private cartRepository: CartRepository,
        private readonly cartMapper : CartMapper
    ) {}

    /**
     * 
     * @param body 
     * @param user 
     */
  async addToCart(requestBody: AddToCartRequest, user: User): Promise<CartListDto> {

      const product = await this.productService.getProductById(requestBody.productId);
      if(!product){
        throw new ApiError('No product exists with specified id', HttpStatus.BAD_REQUEST);
      }

      const productAddedToCart : Cart = await this.cartRepository.findOne({ 
        where: { product: requestBody.productId , user: user.id, deleted : false }
      });

      if(productAddedToCart){
        throw new ApiError('Product has been added to cart already', HttpStatus.CONFLICT);
      }

      const newCartItem = new Cart();

      newCartItem.product = product;
      newCartItem.user = user;
      newCartItem.quantity = requestBody.quantity;

      await this.cartRepository.save(newCartItem);

      return this.getAllCartItems(user);
  }
    
  async getAllCartItems(user: User): Promise<CartListDto> {

        var totalAmount : number = 0;
        var cartItems : CartItemDto[] = []

        const cartListResult = new CartListDto();

        const cartForUser = await this.cartRepository.find({ 
            where: { user: user.id , deleted : false}, 
            relations: ['product']
        });

        if(cartForUser){
            cartForUser.forEach(item => {
                cartItems.push(this.cartMapper.mapToCartDto(item));
                totalAmount += (item.product.price * item.quantity);
            });
            cartListResult.cartItems = cartItems;
            cartListResult.totalAmount = totalAmount;
        }

        return cartListResult;
  }

  async removeCartItem(user: any, cartId: number): Promise<CartListDto> {
      const cartItem : Cart = await this.getCartItemByIdAndUser(cartId,user.id);
      if(!cartItem){
        throw new ApiError('Cart item does not exist', HttpStatus.BAD_REQUEST);;
      }

      cartItem.deleted = true;
      await this.cartRepository.save(cartItem);

      return this.getAllCartItems(user);
  }

  async updateProductCount(user: any, cartId: number, productCount: CartItemCountUpdateDto): Promise<CartListDto> {

    const cartItem : Cart = await this.getCartItemByIdAndUser(cartId,user.id); 
    if(!cartItem){
      throw new ApiError('Cart item does not exist', HttpStatus.BAD_REQUEST);;
    }

    cartItem.quantity = productCount.productCount;
    await this.cartRepository.save(cartItem);

    return this.getAllCartItems(user);
  }

  async getCartItemByIdAndUser(cartId: number, userId: number): Promise<Cart> {
    //query with user to be sure this user are deleting from their own cart
    return await this.cartRepository.findOne({ where: { id: cartId , deleted : false, user : userId} });
  }
    
}


