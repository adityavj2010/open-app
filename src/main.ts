import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './misc/logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const options = {
    logger: logger,
  };
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    options,
  );
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: ['swagger'] });
  const config = new DocumentBuilder().setTitle('Open App Backend').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap().catch((e) => {
  console.error('Error caught in bootstrap', e);
});
