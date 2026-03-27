import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  async sendEmail(to: string, subject: string, text: string, html?: string) {
    try {
      const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL!,
        subject,
        text,
        html: html || text,
      };

      const response = await sgMail.send(msg);

      this.logger.log(`Email enviado: ${JSON.stringify(response[0].statusCode)}`);

      return response;
    } catch (error: any) {
      this.logger.error('Error enviando email', error.response?.body || error);
      throw error;
    }
  }
}