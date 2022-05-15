import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { BusinessModule } from '../business/business.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '36000s' },
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => BusinessModule),
    MailModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersController],
  exports: [UsersService, UsersController],
})
export class UsersModule {}
