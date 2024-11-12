import { Injectable } from '@angular/core';
import { ServerModel } from '../models/server.model';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServerStore {
    // Replaysubject dung khi khong can chay lan dau tien ma` k co default value
    // Behaviorsuject dung` khi can no chay lan dau tien va` phai co gia tri default value
  private _serverId = new ReplaySubject<string>(1);

  public getServer = this._serverId.asObservable();

  public setServer(serverId: string) {
    this._serverId.next(serverId);
  }
}
