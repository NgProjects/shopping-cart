import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/config.jwt';
import { JWTStrategy } from '../strategy/jwt.strategy';

@Module({
  imports: [
    UserModule, 
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigService
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JWTStrategy
  ],
  controllers: [AuthController],
})
export class AuthModule {}
