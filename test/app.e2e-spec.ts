import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { clearDB } from './database';
import { UsersModule } from '../src/users/users.module';
import { RegisterBussiness } from '../src/users/dto/create-user.dto';
import { ERRORS } from '../src/misc/errors';
import { response } from 'express';

const registerBussiness: RegisterBussiness = {
  user: {
    firstName: 'Aditya ',
    lastName: 'Jagtap',
    phoneNumber: '8855019299',
    emailId: 'adityavj2010@gmail.com',
  },
  business: {
    bName: 'Adityas saloon',
    bCity: 'Buffalo',
    bState: 'NY',
    bType: 'saloon',
    bZip: '14214',
  },
  staff: [
    {
      firstName: 'pehla chamcha',
      emailId: 'pehlachamcha@gmail.com',
    },
  ],
  businessServices: [
    {
      serviceName: 'Hair cut',
      cost: 20,
      time: 30,
    },
    {
      serviceName: 'Beard shaping',
      cost: 10,
      time: 20,
    },
  ],
  businessHours: [
    {
      startTime: 10,
      endTime: 17,
      day: 1,
    },
    {
      startTime: 10,
      endTime: 17,
      day: 2,
    },
    {
      startTime: 10,
      endTime: 17,
      day: 3,
    },
  ],
};

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

  it('/bussiness-sign-up (POST)', async () => {
    const result = await request(app.getHttpServer())
      .post('/bussiness-sign-up')
      .send(registerBussiness);
    expect(result.statusCode).toEqual(201);
    const body = result.body;
    expect(body.token).not.toBeNull();
  });

  it('/bussiness-sign-up duplicate signup', async () => {
    const result = await request(app.getHttpServer())
      .post('/bussiness-sign-up')
      .send(registerBussiness);
    expect(result.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(result.body.message).toEqual(ERRORS.EMAIL_TAKEN);
  });
});
