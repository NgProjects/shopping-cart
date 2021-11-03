import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { AddToCartRequest } from "./dto/cart-request.dto";
import { CartService } from "./cart.service";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../guards/jwt.guard";
import { CartListDto } from "./dto/cart-list-dto";
import { CartItemCountUpdateDto } from "./dto/item-count-update.dto";

@ApiTags('cart')
@Controller('cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CartController {

  constructor(private readonly cartService: CartService) {}

  @Post('add')
  @ApiResponse({ status: 201, type: CartListDto })
  async addToCart( @Body() body: AddToCartRequest, @Request() req): Promise<CartListDto> {
      return this.cartService.addToCart(body, req.user);
  }

  @Get('get-all')
  @ApiResponse({ status: 201, type: CartListDto })
  async getAllCartItems(@Request() req): Promise<CartListDto> {
      return this.cartService.getAllCartItems(req.user);
  }

  @Put('update-product-count/:cartId')
  @ApiResponse({ status: 201, type: CartListDto })
  async updateProductCount(@Request() req, @Param('cartId', new ParseIntPipe()) cartId : number, @Body() productCount : CartItemCountUpdateDto): Promise<CartListDto> {
      return this.cartService.updateProductCount(req.user,cartId,productCount);
  }

  @Delete('remove-item/:cartId')
  @ApiResponse({ status: 201, type: CartListDto })
  async removeCartItem(@Request() req, @Param('cartId', new ParseIntPipe()) cartId : number): Promise<CartListDto> {
      return this.cartService.removeCartItem(req.user , cartId);
  }


}