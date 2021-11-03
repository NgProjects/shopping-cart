import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PageRequest } from '../pagination/page.request';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@ApiTags('product')
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @ApiOperation({ description: 'Retreive products' })
    @ApiResponse({
        status: 200,
        description: 'Retreive products',
        type: ProductDto
    })
    @Get('get-all')
    async getAllProducts(@Query() pageRequest : PageRequest) : Promise<ProductDto[]> {
        return this.productService.getAllProducts(pageRequest);
    }

}
