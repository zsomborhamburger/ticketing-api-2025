import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ticketing API 2025')
    .setVersion('1.0')
    .addTag('tickets')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use(
    '/scalar',
    apiReference({
      spec: {
        content: documentFactory,
      },
    }),
  );

  const port = process.env.PORT ?? 3000;
  console.log(`Nestjs is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
