import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddToCartRequest{

    @ApiProperty({
        example: 1,
        type: Number,
        required: true,
    })
    @IsNumber()
    productId: number;

    @ApiProperty({
        example: 3,
        type: Number,
        required: true,
    })
    @IsNumber()
    quantity: number;

}