import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('boostrap');
  const port = process.env.PORT ?? 3000;
  logger.log(`App started on port: ${port}`);
  await app.listen(port);
}

void bootstrap();
