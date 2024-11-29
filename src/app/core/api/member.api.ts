import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MemberModel, MemberRole } from "../models/member.model";

@Injectable({
    providedIn: 'root'
})
export class MemberApi {
    private baseUrl = "http://localhost:3000/api/members"
    public constructor(private http: HttpClient) {}

    public getMembers(serverId: string): Observable<MemberModel[]>{
        return this.http.get<MemberModel[]>(`${this.baseUrl}/${serverId}`)
    }

    public getMember(memberId: string): Observable<MemberModel> {
        return this.http.get<MemberModel>(`${this.baseUrl}/detail/${memberId}`)
    }

    public updateMemberRole(memberId: string, role: MemberRole, serverId: string): Observable<MemberModel> {
        return this.http.patch<MemberModel>(`${this.baseUrl}/role/${memberId}?serverId=${serverId}`, {
            role,
        })
    }

    public updateMemberOnline(memberId: string, isOnline: boolean, serverId: string): Observable<MemberModel> {
        return this.http.patch<MemberModel>(`${this.baseUrl}/isOnline/${memberId}?serverId=${serverId}`, {
            isOnline,
        })
    }

    public deleteMember (memberId: string, serverId: string): Observable<MemberModel> {
        return this.http.delete<MemberModel>(`${this.baseUrl}/${memberId}?serverId=${serverId}`)
    }
}