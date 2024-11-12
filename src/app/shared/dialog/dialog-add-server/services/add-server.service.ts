import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServerApi } from "src/app/core/api/server.api";
import { ServerModel } from "src/app/core/models/server.model";

@Injectable()
export class AddServerService {
    public constructor(private serverApi: ServerApi) {}

    public addServer(name: string, imageUrl: string, profileId: string): Observable<ServerModel> {
        return this.serverApi.createServer(name, imageUrl, profileId);
    }
}