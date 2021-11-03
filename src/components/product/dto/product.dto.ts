import { ApiProperty } from "@nestjs/swagger";

export class ProductDto{
    
    @ApiProperty({
        example: 1,
        type: Number
    })
    productId : number;

    @ApiProperty({
        example: 'Iphone 13',
        type: String
    })
    name: string;
    
    @ApiProperty({
        example: 'https://iphone13.png',
        type: String
    })
    imageUrl: string;
    
    @ApiProperty({
        example: 'Brand new Iphone 13',
        type:String
    })
    description: string;
    
    @ApiProperty({
        example: 10000,
        type: Number
    })
    price: number;

    @ApiProperty({
        example: 1,
        type: Number
    })
    availableQuantity: number;
}