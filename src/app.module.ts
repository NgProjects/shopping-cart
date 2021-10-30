import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { moduleList } from './moduleList';
import { validate } from './components/config/config.validation';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ...moduleList.map(module => {
    return forwardRef(() => module);
    }),
    ConfigModule.forRoot({
      validate,
      cache: true
    }),
  ]
})
export class AppModule {}
