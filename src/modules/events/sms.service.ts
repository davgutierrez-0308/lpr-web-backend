import { Injectable, Logger } from '@nestjs/common';
import Twilio from 'twilio';

@Injectable()
export class SmsService {
  private readonly client: Twilio.Twilio;
  private readonly logger = new Logger(SmsService.name);

  constructor() {
    this.client = Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  async sendSms(to: string, message: string) {
    try {
      const response = await this.client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to,
      });

      this.logger.log(`SMS enviado: ${response.sid}`);
      return response;
    } catch (error) {
      this.logger.error('Error enviando SMS', error);
      throw error;
    }
  }
}