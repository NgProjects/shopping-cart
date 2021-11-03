import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe());

  //set up swagger
  const options = new DocumentBuilder()
  .setTitle('Cart service')
  .setDescription('Service for managing shopping cart')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(configService.get('SWAGGER_URL'), app, document);
  //set up swagger

  await app.listen(configService.get('API_PORT'));
}
bootstrap();
