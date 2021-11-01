import { Body, Controller, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiError } from '../errors/APIError';
import { LocalAuthGuard } from '../guards/local.guard';
import { UserLoginDto } from '../user/dto/user-login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ description: 'Handle user login and return authorization token' })
    @ApiResponse({
        status: 200,
        description: 'Login Response',
        isArray: true,
    })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req , @Body() userRequest: UserLoginDto,  @Res() res: Response) {
      const token = await this.authService.login(req.user);
      if (!token) {
          throw new ApiError('Invalid login name or password.', HttpStatus.UNAUTHORIZED);
      }
      res.setHeader('Authorization', 'Bearer ' + token.access_token);
      return res.json(token);
    }

}
