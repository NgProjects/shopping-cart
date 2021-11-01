import { Injectable } from "@nestjs/common";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductMapper {

    public mapFromEntityToDto(product : Product) : ProductDto {

        const productDto = new ProductDto();

        productDto.productId = product.id;
        productDto.description = product.description;
        productDto.imageUrl = product.imageUrl;
        productDto.name = product.name;
        productDto.price = product.price;
        productDto.availableQuantity = product.availableQuantity;

        return productDto;
    }
}