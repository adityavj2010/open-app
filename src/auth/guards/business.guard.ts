import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private user: UsersService, private bus) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
