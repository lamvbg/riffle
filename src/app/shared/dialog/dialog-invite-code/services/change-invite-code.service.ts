import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServerApi } from "src/app/core/api/server.api";
import { ServerModel } from "src/app/core/models/server.model";

@Injectable()
export class ChangeInviteCodeService {
    public constructor(private serverApi: ServerApi) {}

    public changeInviteCode(serverId: string): Observable<ServerModel> {
        return this.serverApi.changeInviteCode(serverId);
    }
}