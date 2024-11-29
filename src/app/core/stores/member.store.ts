import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MemberStore {
    private _memberId = new ReplaySubject<string>(1)
    public getMember = this._memberId.asObservable()
    public setMember(memberId: string) {
        this._memberId.next(memberId)
    }
}