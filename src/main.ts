import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dns').setDefaultResultOrder('ipv4first');
import fetch from 'node-fetch';
(globalThis as any).fetch = fetch;



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
