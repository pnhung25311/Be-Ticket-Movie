import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dns').setDefaultResultOrder('ipv4first');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
