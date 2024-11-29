import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthApi } from 'src/app/core/api/auth.api';
import { AuthModel } from 'src/app/core/models/auth.model';
import { UserModel } from 'src/app/core/models/user.model';

@Injectable()
export class LoginService {
  public constructor(private authApi: AuthApi) {}

  public login(username: string, password: string): Observable<AuthModel> {
    return this.authApi.login(username, password);
  }

  public getUser(userId: string): Observable<UserModel> { 
    return this.authApi.getUser(userId);
  }

  public googleLogin(): void {
    this.authApi.googleLogin();
  }

  public handleGoogleRedirect(): Observable<AuthModel> {
    return this.authApi.handleGoogleRedirect();
  }
}
