import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): any {
    return { test: 'Aj' };
  }
}
