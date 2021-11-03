import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductMapper } from './mapper/product.mapper';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  providers: [
    ProductService,
    ProductMapper
  ],
  imports: [
    TypeOrmModule.forFeature([Product, ProductRepository]),
  ],  
  exports: [
    ProductService,
    ProductMapper
  ],
  controllers: [ProductController],
})
export class ProductModule {}
