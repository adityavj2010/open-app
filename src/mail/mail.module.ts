import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { env } from '../../env';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env.mail.host,
        port: env.mail.port,

        auth: {
          user: env.mail.auth.user,
          pass: env.mail.auth.pass,
        },
        from: '',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],

  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
