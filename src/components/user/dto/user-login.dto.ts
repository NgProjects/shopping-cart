import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
    
    @ApiProperty({
        example: 'test@email.com',
        type: String,
        required: true,
    })
    @IsString()
    readonly username: string;

    @ApiProperty({
        example: 'password',
        type: String,
        required: true,
    })
    @IsString()
    readonly password: string;
}
