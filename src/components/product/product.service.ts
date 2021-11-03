import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual } from 'typeorm';
import { PageRequest } from '../pagination/page.request';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { ProductMapper } from './mapper/product.mapper';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

    constructor(@InjectRepository(ProductRepository) private productRepository: ProductRepository, 
                public productMapper : ProductMapper) {}

    /**
     * 
     * @param productId 
     * @returns 
     */
    getProductById(productId: number) {
        return this.productRepository.findOne({ where: { id: productId , deleted : false} });
    }

    /**
     * 
     * @param pageRequest 
     */
    async getAllProducts(pageRequest: PageRequest): Promise<ProductDto[]> {
        
        const result : Product[] = await this.productRepository.find({ 
            where:{availableQuantity: MoreThanOrEqual(1), deleted : false},
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: {'id': 'DESC'}
        });

        if(result){
            return result.map(product => this.productMapper.mapFromEntityToDto(product))
        }

        return [];
    }

}
