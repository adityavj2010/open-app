import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && user.password === pass) {
      const { password, tempPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { emailId: user.emailId, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
