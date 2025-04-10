import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type, Accept, Authorization', 
    credentials: true, 
  });
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 7000);
}
bootstrap();
