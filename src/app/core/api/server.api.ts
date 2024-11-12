import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerModel } from "../models/server.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ServerApi {
    private basedUrl = 'http://localhost:3000/api/servers';
    public constructor(private http: HttpClient) {}

    public createServer(
        name: string,
        imageUrl: string,
        profileId: string,
    ): Observable<ServerModel> {
        return this.http.post<ServerModel>(`${this.basedUrl}/${profileId}`, {
            name,
            imageUrl,
        });
    }

    public getServers(): Observable<ServerModel[]> {
        return this.http.get<ServerModel[]>(`${this.basedUrl}`);
    }

    public getServer(serverId: string): Observable<ServerModel> {
        return this.http.get<ServerModel>(`${this.basedUrl}/${serverId}`);
    }

    public changeInviteCode(serverId: string):Observable<ServerModel> {
        return this.http.patch<ServerModel>(`${this.basedUrl}/${serverId}/invite-code`, {});
    }

    public updateServer(serverId: string, name: string, imageUrl: string): Observable<ServerModel> {
        return this.http.patch<ServerModel>(`${this.basedUrl}/${serverId}`, {
            name,
            imageUrl,
        });
    }

    public deleteServer(serverId: string): Observable<ServerModel> {
        return this.http.delete<ServerModel>(`${this.basedUrl}/${serverId}`);
    }

    public leaveServer(serverId: string, profileId: string): Observable<ServerModel> {
        return this.http.patch<ServerModel>(`${this.basedUrl}/${serverId}/leave`, {
            profileId
        });
    }

    public joinServer(inviteCode: string, profileId: string): Observable<ServerModel> {
        return this.http.post<ServerModel>(`${this.basedUrl}/join/${inviteCode}`, {
            profileId
        });
    }
}