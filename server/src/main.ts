import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: /http:\/\/(localhost|0.0.0.0|127.0.0.1|192.168.0.\d+)(:\d+)?/,
      credentials: true,
    },
  });
  app.setGlobalPrefix('api');
  await app.listen(3020);
}
bootstrap();
