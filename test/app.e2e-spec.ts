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

const signInBody = {
  emailId: 'adityavj2010@gmail.com',
  password: 'password',
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

  it('Business Sign-up', async () => {
    const result = await request(app.getHttpServer())
      .post('/bussiness-sign-up')
      .set('Content-Type', 'application/json')
      .send(registerBussiness);
    expect(result.statusCode).toEqual(201);
    const body = result.body;
    expect(body.token).not.toBeNull();
    token = body.token;
  });

  it('Test re registration', async () => {
    const result = await request(app.getHttpServer())
      .post('/bussiness-sign-up')
      .send(registerBussiness);
    expect(result.statusCode).toEqual(HttpStatus.CONFLICT);
    expect(result.body.message).toEqual(ERRORS.EMAIL_TAKEN);
  });

  it('Sign in check', async () => {
    const result = await request(app.getHttpServer())
      .post('/sign-in')
      .set('Content-Type', 'application/json')
      .send(signInBody);

    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    console.log('result.body', result.body);
    token = result.body.token;
  });
});

describe('Business Details', () => {
  let app: NestFastifyApplication;
  let token;
  let bId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    const result = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInBody);
    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    token = result.body.token;
  });

  it('Check business details', async () => {
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

describe('Business Details', () => {
  let app: NestFastifyApplication;
  let token;
  let bId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    const result = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInBody);
    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    token = result.body.token;
  });

  it('Check business details', async () => {
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

describe('Staff Testcases', () => {
  let app: NestFastifyApplication;
  let token;
  let bId;
  let newStaffId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    let result = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInBody);
    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    token = result.body.token;
    result = await request(app.getHttpServer())
      .get('/business/get-owned-business')
      .set('Authorization', 'Bearer ' + token)
      .send();
    bId = result.body.bId;
  });

  it('Get staff list', async () => {
    const result = await request(app.getHttpServer())
      .get(`/business/${bId}/staff`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);

    expect(result.body.length).toEqual(1);
    expect(result.body[0].firstName).toEqual(
      registerBussiness.staff[0].firstName,
    );
  });

  it('Add staff list', async () => {
    const newStaffMember = {
      firstName: 'doosra chamcha',
      emailId: 'doosra@gmail.com',
    };
    let result = await request(app.getHttpServer())
      .post(`/business/${bId}/staff`)
      .set('Authorization', 'Bearer ' + token)
      .send(newStaffMember);
    expect(result.statusCode).toEqual(201);

    newStaffId = result.body;

    result = await request(app.getHttpServer())
      .get(`/business/${bId}/staff`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.length).toEqual(2);

    result = await request(app.getHttpServer())
      .get(`/business/${bId}/staff/${newStaffId}`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.firstName).toEqual(newStaffMember.firstName);
  });

  it('Edit staff member', async () => {
    const updateStaff = {
      firstName: 'teesra chamcha',
    };
    let result = await request(app.getHttpServer())
      .patch(`/business/${bId}/staff/${newStaffId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(updateStaff);
    expect(result.statusCode).toEqual(200);

    result = await request(app.getHttpServer())
      .get(`/business/${bId}/staff`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.length).toEqual(2);
    result = await request(app.getHttpServer())
      .get(`/business/${bId}/staff/${newStaffId}`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.firstName).toEqual(updateStaff.firstName);
  });
});

describe('User Testcases', () => {
  let app: NestFastifyApplication;
  let token;
  let bId;
  let userId;
  let newStaffId;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  beforeEach(async () => {
    let result = await request(app.getHttpServer())
      .post('/sign-in')
      .send(signInBody);
    expect(result.statusCode).toEqual(201);
    expect(result.body.token).not.toBeNull();
    token = result.body.token;
    result = await request(app.getHttpServer())
      .get('/business/get-owned-business')
      .set('Authorization', 'Bearer ' + token)
      .send();
    bId = result.body.bId;
  });

  it('Check user data', async () => {
    const result = await request(app.getHttpServer())
      .get('/users/get-info')
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);
    expect(result.body.firstName).toEqual(registerBussiness.user.firstName);
    expect(result.body.lastName).toEqual(registerBussiness.user.lastName);
    userId = result.body.id;
  });

  it('Update and check user data', async () => {
    const newName = {
      firstName: 'New name',
      lastName: 'New lastname',
    };
    let result = await request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', 'Bearer ' + token)
      .send(newName);
    expect(result.statusCode).toEqual(200);
    result = await request(app.getHttpServer())
      .get(`/users/get-info`)
      .set('Authorization', 'Bearer ' + token)
      .send();
    expect(result.statusCode).toEqual(200);

    expect(result.body.firstName).toEqual(newName.firstName);
    expect(result.body.lastName).toEqual(newName.lastName);
  });
});
