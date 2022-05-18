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
import { CreateAppointmentDto } from '../src/appointments/dto/create-appointment.dto';
const url = 'http://rxfarm91.cse.buffalo.edu:5001/api/';
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
      serviceName: 'Beard shaping',
      cost: 10,
      time: 90,
    },
    {
      serviceName: 'Hair cut',
      cost: 20,
      time: 30,
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
      endTime: '14:00:00',
      day: 2,
    },
    {
      startTime: '10:00:00',
      endTime: '13:00:00',
      day: 3,
    },
    {
      startTime: '10:00:00',
      endTime: '15:00:00',
      day: 4,
    },
    {
      startTime: '10:00:00',
      endTime: '14:00:00',
      day: 5,
    },
    {
      startTime: '10:00:00',
      endTime: '13:00:00',
      day: 6,
    },
  ],
};

const signInBody = {
  emailId: 'adityavj2010@gmail.com',
  password: 'password',
};
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

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
    console.log('result', result.text);
    expect(result.statusCode).toEqual(201);
    const body = result.body;
    expect(body.token).not.toBeNull();
    token = body.token;
  });

  it('check book appointment', async () => {
    const fivepm = new Date();
    const appointment: CreateAppointmentDto = {
      bId: 1,
      staffId: 1,
      startDateTime: fivepm,
      uId: 1,
      serviceId: 1,
      notes: 'Test',
    };

    const result = await request(app.getHttpServer())
      .post('/appointments/book')
      .send(appointment);
    console.log('result', result.body);
    expect(result.statusCode).toEqual(HttpStatus.CREATED);

    const result2 = await request(app.getHttpServer())
      .delete('/appointments/' + result.body.appId)
      .send();
    console.log('result', result2.body);
    expect(result2.statusCode).toEqual(HttpStatus.OK);
  });
});

function minusHour(date) {
  const date1 = new Date(date.toString());
  date1.setHours(date1.getHours() + 2);
  return new Date(date1);
}

// var form = new FormData();
// form.append("file", fileInput.files[0], "Screen Shot 2022-03-10 at 11.45.26 AM.png");
//
// var settings = {
//   "url": "http://localhost:3000/api/file",
//   "method": "POST",
//   "timeout": 0,
//   "processData": false,
//   "mimeType": "multipart/form-data",
//   "contentType": false,
//   "data": form
// };
//
// $.ajax(settings).done(function (response) {
//   console.log(response);
// });
