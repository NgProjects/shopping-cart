import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository) {}

    getProductById(productId: number) {
        return this.productRepository.findOne({ where: { id: productId , deleted : false} });
    }

}
