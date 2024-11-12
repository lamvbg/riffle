import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { UserModel } from 'src/app/core/models/user.model';

@Injectable()
export class RegisterService {
  public constructor(private profileApi: ProfileApi) {}

  public register(
    email: string,
    name: string,
    userId: string,
    password: string,
    imageUrl: string,
  ): Observable<UserModel> {
    return this.profileApi.register(email, name, userId, password, imageUrl);
  }
}
