import { PlateEvent } from "@prisma/client";
export type RealtimeEvent = {
    type: "plate_event";
    data: PlateEvent;
} | {
    type: "heartbeat";
    data: {
        ts: string;
    };
};
export declare class RealtimeService {
    private stream$;
    emit(evt: RealtimeEvent): void;
    observable(): import("rxjs").Observable<RealtimeEvent>;
}
