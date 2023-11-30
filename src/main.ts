import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './configuration/swagger.config';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig(app);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
