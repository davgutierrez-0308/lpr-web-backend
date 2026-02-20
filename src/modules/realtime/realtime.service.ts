import { Injectable } from "@nestjs/common";
import { Subject } from "rxjs";
import { PlateEvent } from "@prisma/client";

export type RealtimeEvent =
  | { type: "plate_event"; data: PlateEvent }
  | { type: "heartbeat"; data: { ts: string } };

@Injectable()
export class RealtimeService {
  private stream$ = new Subject<RealtimeEvent>();

  emit(evt: RealtimeEvent) {
    this.stream$.next(evt);
  }

  observable() {
    return this.stream$.asObservable();
  }
}
