import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailOptions } from 'nodemailer';
import { ERRORS } from '../misc/errors';
import { Interface } from 'readline';

export interface EmailCtx {
  staffName: string;
  businessName: string;
  appNumber: number;
  dateTime: Date;
  customerName: string;
}

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCustomerAppointmentCancellation(email, ctx: EmailCtx) {
    const { staffName, businessName, appNumber, dateTime } = ctx;
    const date = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toTimeString();
    const subject = `Appointment Cancellation #${appNumber}`;
    const text = `Your appointment has been cancelled for ${date}`;
    return this.sendEmail(email, subject, text);
  }

  async sendBusinessAppointmentCancellation(email, ctx: EmailCtx) {
    const { staffName, businessName, appNumber, dateTime, customerName } = ctx;
    const date = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toTimeString();
    const subject = `Appointment Cancellation #${appNumber}`;
    const text = `Your appointment with ${customerName} has been cancelled for the date ${date}`;
    return this.sendEmail(email, subject, text);
  }

  async sendCustomerAppoitmentConfirmation(email, ctx: EmailCtx) {
    const { staffName, businessName, appNumber, dateTime } = ctx;
    const date = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toTimeString();
    const subject = `Appointment Confirmation #${appNumber}`;
    const text = `Your appointment has been booked on ${date} with ${staffName} at ${businessName}`;
    return this.sendEmail(email, subject, text);
  }

  async sendBusinessAppoitmentConfirmation(email, ctx: EmailCtx) {
    const { staffName, businessName, appNumber, dateTime, customerName } = ctx;

    const date = new Date(dateTime).toDateString();
    const time = new Date(dateTime).toTimeString();
    const subject = `Appointment Confirmation #${appNumber}`;
    const text = `An appointment has been booked on ${date} with ${staffName} by ${customerName}`;
    return this.sendEmail(email, subject, text);
  }

  async sendEmail(emailId, subject, content) {
    const html = `<p>${content}</p>`;
    console.log(emailId, subject, content);

    try {
      const result = await this.mailerService.sendMail({
        from: 'openapp123@yahoo.com',
        to: emailId,
        subject: subject,
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
      console.error('error', e.message);
      throw new HttpException(
        ERRORS.EMAIL_SENDING_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendUserPassword(emailId: string, password: string): Promise<boolean> {
    const html = `<p>Use this password to login = ${password}</p>`;
    try {
      const result = await this.mailerService.sendMail({
        from: 'openapp123@yahoo.com',
        to: emailId,
        subject: 'OpenApp password',
        html: html,
      });
      console.log({ result });

      if (result) {
        return true;
      }

      throw new HttpException(
        ERRORS.EMAIL_SENDING_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } catch (e) {
      console.error('error', e.message);
      throw new HttpException(
        ERRORS.EMAIL_SENDING_FAILURE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
