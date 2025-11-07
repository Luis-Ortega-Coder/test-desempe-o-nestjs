import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Swagger set up
  const config = new DocumentBuilder()
  .setTitle('E-commerce API')
  .setDescription('API documentation for the E-commerce application')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`)
  console.log(`📘 Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
