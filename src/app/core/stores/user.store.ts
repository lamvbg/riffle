import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private _user = new BehaviorSubject<AuthModel | null>(null);

  public getUser = this._user.asObservable();

  public setUser(user: AuthModel) {
    this._user.next(user);
    window.localStorage.setItem('auth', JSON.stringify(user));
  }

  public removeUser() {
    this._user.next(null);
    window.localStorage.removeItem('auth');
  }

  public rehyrateAuth(): boolean {
    const auth = window.localStorage.getItem('auth');
    if (auth) {
      this._user.next(JSON.parse(auth));
    }
    return !!auth;
  }
}
