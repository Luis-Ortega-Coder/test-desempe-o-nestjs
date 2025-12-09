import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { JwtRolesGuard } from "./common/guards/jwt-roles.guard"
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from "./common/guards/roles.guard"
import { HttpExceptionFilter } from "./common/filter/http-exception.filter"
import { TransformInterceptor } from "./common/interceptor/transform.interceptor"
import { ExceptionFactory } from "./common/exceptions/exception.factory"
import bodyParse from 'body-parser';
import helmet from 'helmet';
import compression from 'compression'
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalGuards(new JwtRolesGuard(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use(bodyParse.json({ limit: '10kb' }));
  app.use(helmet());
  app.enableCors();
  app.use(compression({ level: 6 }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // elimina props no declaradas
      forbidNonWhitelisted: true, // error si hay props extra
      transform: true,        // convierte tipos (string→number, etc.)
      stopAtFirstError: true, // devuelve solo el primer error
    }),
  );

  //Rate limiting 
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 150,
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
