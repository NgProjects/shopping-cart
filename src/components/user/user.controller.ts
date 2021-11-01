import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @ApiOperation({ description: 'Create user' })
    @ApiResponse({
        status: 200,
        description: 'Create User',
        type: 'string'
    })
    @Post('create-user')
    async createUser(@Body() userRequest: CreateUserDto) {
      this.userService.createUser(userRequest);
    }

}
