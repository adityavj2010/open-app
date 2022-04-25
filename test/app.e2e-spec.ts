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
      startTime: '10:00:00',
      endTime: '15:00:00',
      day: 1,
    },
    {
      startTime: '10:00:00',
      endTime: '15:00:00',
      day: 2,
    },
    {
      startTime: '10:00:00',
      endTime: '15:00:00',
      day: 3,
    },
  ],
};

describe('Sign up', () => {
  let app: NestFastifyApplication;
  let token;
  let bId;
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
    console.log('/bussiness-sign-up (POST)', result.statusCode, result.text);
    expect(result.statusCode).toEqual(201);
    const body = result.body;
    expect(body.token).not.toBeNull();
    token = body.token;
  });

  it('/bussiness-sign-up duplicate signup', async () => {
    const result = await request(app.getHttpServer())
      .post('/bussiness-sign-up')
      .send(registerBussiness);
    expect(result.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(result.body.message).toEqual(ERRORS.EMAIL_TAKEN);
  });

  it('Sign in check', async () => {
    const signInBody = {
      emailId: 'adityavj2010@gmail.com',
      password: 'password',
    };
    const result = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInBody);
    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    token = result.body.token;
  });

  it('Check business details', async () => {
    const signInBody = {
      emailId: 'adityavj2010@gmail.com',
      password: 'password',
    };

    const result = await request(app.getHttpServer())
      .get('/business/get-owned-business')
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.bName).toEqual(registerBussiness.business.bName);
    expect(result.body.bType).toEqual(registerBussiness.business.bType);
    expect(result.body.bState).toEqual(registerBussiness.business.bState);
    expect(result.body.bZip).toEqual(registerBussiness.business.bZip);
    expect(result.body.bCity).toEqual(registerBussiness.business.bCity);
    expect(result.body.bId).not.toBeUndefined();

    bId = result.body.bId;
    console.log({ bId });
  });

  it('Update business details', async () => {
    const newBusiness = registerBussiness.business;
    newBusiness.bName = 'New name';
    let result = await request(app.getHttpServer())
      .patch(`/business/${bId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(newBusiness);
    expect(result.statusCode).toEqual(200);
    result = await request(app.getHttpServer())
      .get('/business/get-owned-business')
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.bName).toEqual(newBusiness.bName);
    expect(result.body.bType).toEqual(registerBussiness.business.bType);
    expect(result.body.bState).toEqual(registerBussiness.business.bState);
    expect(result.body.bZip).toEqual(registerBussiness.business.bZip);
    expect(result.body.bCity).toEqual(registerBussiness.business.bCity);
  });
});
