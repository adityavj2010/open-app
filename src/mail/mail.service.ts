import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailOptions } from 'nodemailer';
import { ERRORS } from '../misc/errors';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserPassword(emailId: string, password: string): Promise<boolean> {
    const html = `<p>Use this password to login = ${password}</p>`;
    try {
      const result = await this.sendUserConfirmation({
        to: emailId,
        subject: 'OpenApp password',
        html: html,
      });
      if (result) {
        return true;
      }
      throw new HttpException(
        ERRORS.EMAIL_SENDING_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (e) {
      throw new HttpException(
        ERRORS.EMAIL_SENDING_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendUserConfirmation(sendEmailOptions: any): Promise<boolean> {
    return this.mailerService.sendMail(sendEmailOptions).then(() => {
      return true;
    });
  }
}
