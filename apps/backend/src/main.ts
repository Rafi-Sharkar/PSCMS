import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('PSCMS API')                // Your API title
    .setDescription('API documentation for Poultry Supply Chain') // Description
    .setVersion('1.0')                    // Version
    .addBearerAuth()                      // For JWT Bearer Token
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Available at /api

  app.enableCors({
    origin: 'http://localhost:3000', // your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
