import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [
    UserService
  ],
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  exports: [
    UserService
  ],
  controllers: [UserController],
})
export class UserModule {}
