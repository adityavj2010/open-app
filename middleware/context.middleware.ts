import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { GetContext, SetContext } from '../src/misc/context';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.headers.authorization) {
        const token = this.jwt.decode(req.headers.authorization.split(' ')[1]);
        SetContext(req, token);
      }
    } catch (error) {
      console.error('ContextMiddleware', error);
    }
    next();
  }
}
