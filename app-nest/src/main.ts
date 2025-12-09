import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import bodyParse from 'body-parser';
import helmet from 'helmet';
import compression from 'compression'
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParse.json({ limit: '10kb' }));
  app.use(helmet());
  app.enableCors();
  app.use(compression({ level: 6 }));

  //Rate limiting 
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    statusCode: 429,
    message: 'You have reached the request limit. Please try again later.',
    ipv6Subnet: 52,
    legacyHeaders: false,
    standardHeaders: true,
  }));

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
