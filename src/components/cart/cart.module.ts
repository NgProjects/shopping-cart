import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/product.module";
import { ProductService } from "../product/product.service";
import { CartController } from "./cart.controller";
import { Cart } from "./cart.entity";
import { CartRepository } from "./cart.repository";
import { CartService } from "./cart.service";
import { CartMapper } from "./mapper/cart.mapper";

@Module({
    imports: [
      ProductModule,
      TypeOrmModule.forFeature([Cart, CartRepository]),
    ],
    controllers: [CartController],
    providers: [
      CartService,
      CartMapper
    ],
  })
  export class CartModule {}