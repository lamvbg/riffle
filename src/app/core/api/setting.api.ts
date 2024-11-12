import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SettingModel } from "../models/setting.model";

@Injectable({
    providedIn: "root",
})
export class SettingApi {
    private baseUrl = "http://localhost:3000/api/setting"
    public constructor(private http: HttpClient) {}

    public getSetting(profileId: string): Observable<SettingModel> {
        return this.http.get<SettingModel>(`${this.baseUrl}/${profileId}`);
    }

    public updateSetting(profileId: string, setting: SettingModel): Observable<SettingModel> {
        return this.http.patch<SettingModel>(`${this.baseUrl}/${profileId}`, setting);
    }
}