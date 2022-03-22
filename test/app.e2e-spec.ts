import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { clearDB } from './database';

describe('Non login apis', () => {
  let app: INestApplication;

  afterAll(async () => {
    // await clearDB();
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // await clearDB();
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        emailId: 'adityavj2010@gmail.com',
        password: 'password',
        firstName: 'Aditya',
        phoneNumber: '8855019299',
      })
      .expect(201)
      .expect('Success');
  });
});
