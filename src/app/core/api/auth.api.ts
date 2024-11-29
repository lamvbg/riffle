import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private basedUrl = 'http://localhost:3000/api/auth';
  public constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<AuthModel> {
    return this.http.post<AuthModel>(`${this.basedUrl}/sign-in`, {
      email,
      password,
    });
  }

  public getUser(userId: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.basedUrl}/users/${userId}`);
  }

  public googleLogin(): void {
    window.location.href = `${this.basedUrl}/google/login`;
  }

  public handleGoogleRedirect(): Observable<AuthModel> {
    return this.http.get<AuthModel>(`${this.basedUrl}/google/redirect`);
  }
}
