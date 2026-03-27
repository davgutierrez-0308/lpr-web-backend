import sgMail from '@sendgrid/mail';
export declare class EmailService {
    private readonly logger;
    constructor();
    sendEmail(to: string, subject: string, text: string, html?: string): Promise<[sgMail.ClientResponse, {}]>;
}
