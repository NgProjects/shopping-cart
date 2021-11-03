import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, IsNumber, Min } from "class-validator";

export class CartItemCountUpdateDto{

    @ApiProperty({
        example: 3,
        required: true,
        type: Number,
    })
    @IsNumber()
    @IsInt()
    @Min(1,{message : 'Product count must be greater than 1'})
    productCount: number;
}