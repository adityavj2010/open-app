import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { clearDB } from './database';
import { UsersModule } from '../src/users/users.module';

describe('Sign up', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    jest.setTimeout(60000);
    await clearDB();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/sign-up (POST)', async () => {
    const result = await request(app.getHttpServer()).post('/sign-up').send({
      emailId: 'adityavj2010@gmail.com',
      password: 'password',
      firstName: 'Aditya',
      phoneNumber: '8855019299',
    });
    expect(Number(result.text)).toBeGreaterThanOrEqual(1);
    expect(result.statusCode).toEqual(201);
  });
});
