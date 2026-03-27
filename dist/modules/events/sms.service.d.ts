export declare class SmsService {
    private readonly client;
    private readonly logger;
    constructor();
    sendSms(to: string, message: string): Promise<import("twilio/lib/rest/api/v2010/account/message").MessageInstance>;
}
