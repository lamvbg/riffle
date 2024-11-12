import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi {
  private basedUrl = 'http://localhost:3000/api/profiles';
  public constructor(private http: HttpClient) {}

  public register(
    email: string,
    name: string,
    userId: string,
    password: string,
    imageUrl: string,
  ): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.basedUrl}`, {
      email,
      name,
      userId,
      password,
      imageUrl,
    });
  }

  public getUser(profileId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.basedUrl}/${profileId}`);
  }

  public getUsers(): Observable<ProfileModel[]> {
    return this.http.get<ProfileModel[]>(`${this.basedUrl}`);
  }


  //Partial laf update 1 phan`
  public updateUser(
    profileId: string,
    profile: Partial<ProfileModel>,
  ): Observable<UserModel> {
    return this.http.patch<ProfileModel>(`${this.basedUrl}/${profileId}`, profile);
  }

  public deleteUser(profileId: string): Observable<ProfileModel> {
    return this.http.delete<ProfileModel>(`${this.basedUrl}/${profileId}`);
  }

  public getServerProfile(profileId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.basedUrl}/${profileId}/servers`);
  }

  public getChannelProfile(profileId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.basedUrl}/${profileId}/channels`);
  }

  public getMemberProfile(profileId: string): Observable<ProfileModel> {
    return this.http.get<ProfileModel>(`${this.basedUrl}/${profileId}/members`);
  }
}
