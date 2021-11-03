import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({
        example: 'password',
        type: String,
        required: true,
    })
    @IsString()
    readonly password: string;
    
    @ApiProperty({
        example: 'test2@email.com',
        type: String,
        required: true,
    })
    @IsString()
    readonly email: string;
    
    @ApiProperty({
        example: '+23466376467677',
        type: String,
        required: true,
    })
    @IsString()
    phoneNumber: string;
    
    @ApiProperty({
        example: 'Firstname Lastname',
        type: String,
        required: true,
    })
    @IsString()
    fullName: string;
}