import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChannelStore {
    private _channelId = new ReplaySubject<string>(1);
    public getChannel = this._channelId.asObservable();

    public setChannel(channelId: string) {
        this._channelId.next(channelId);
    }
}
