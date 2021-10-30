import { Body, Controller, Post } from "@nestjs/common";
import { CartDto } from "./cart.dto";
import { CartService } from "./cart.service";

@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) {}
  

}