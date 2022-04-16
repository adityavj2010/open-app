import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
      // or

      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'lilyan.kub11@ethereal.email',
          pass: 'fqSAZ1tqSuHHsWQazK',
        },
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
