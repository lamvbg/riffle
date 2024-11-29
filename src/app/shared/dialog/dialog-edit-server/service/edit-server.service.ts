import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServerApi } from "src/app/core/api/server.api";
import { ServerModel } from "src/app/core/models/server.model";

@Injectable()
export class EditServerService {
    public constructor(private serverApi: ServerApi) {}

    public editServer(name: string, imageUrl: string, serverId: string): Observable<ServerModel> {
        return this.serverApi.updateServer(serverId, name, imageUrl);
    }
}