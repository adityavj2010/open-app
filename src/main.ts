import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { logger } from './misc/logger';
import { ValidationPipe } from '@nestjs/common';
import { FastifyStaticOptions } from '@nestjs/platform-fastify/interfaces/external';
import { JwtService } from '@nestjs/jwt';
import { env } from '../env';

async function bootstrap() {
  const options = {
    // logger: logger,
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
  await app.listen(env.app_port, '0.0.0.0');
}
bootstrap().catch((e) => {
  console.error('Error caught in bootstrap', e);
});

// curl -X POST http://localhost:3000/api/sign-in -d '{"emailId": "aditya", "password": "changeme"}' -H "Content-Type: application/json"
