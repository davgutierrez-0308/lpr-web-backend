import { AlertType } from "@prisma/client";
export declare class CreateAlertDto {
    plate: string;
    type: AlertType;
    description?: string;
}
