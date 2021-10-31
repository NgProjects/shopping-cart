import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginDto {
    
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
    readonly username: string;
}
