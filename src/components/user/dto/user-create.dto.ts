import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({
        example: 'Users password',
        type: String,
        required: true,
    })
    @IsString()
    readonly password: string;
    
    @ApiProperty({
        example: 'User email',
        type: String,
        required: true,
    })
    @IsString()
    readonly email: string;
    
    @ApiProperty({
        example: 'Phone number',
        type: String,
        required: true,
    })
    @IsString()
    phoneNumber: string;
    
    @ApiProperty({
        example: 'Full Name',
        type: String,
        required: true,
    })
    @IsString()
    fullName: string;
}