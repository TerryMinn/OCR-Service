import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Prefix
  app.setGlobalPrefix('/api/v1');

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Swigger Docs
  const config = new DocumentBuilder()
    .setTitle('OCR Service🚀')
    .setDescription('The OCR Service API description')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1, docExpansion: 'none' },
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

  // Listen
  await app.listen(8000);
}
bootstrap();
