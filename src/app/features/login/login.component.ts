import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { ButtonComponent } from '@app-ui';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoginService } from './component/login-form/services/login.service';
import { BehaviorSubject, filter, map, Observable, ReplaySubject, switchMap } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'riffle-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent,
    RouterLink,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  public isRegister = signal(false);
  // public user$!: Observable<UserModel>;
  public readonly user$ = new ReplaySubject<UserModel>(1);
  public constructor(
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    // this.user$ = this.activatedRoute.paramMap.pipe(
    //   map((paramMap) => paramMap.get('userId')),
    //   filter(Boolean),
    //   switchMap((userId) => this.loginService.getUser(userId)),
    // );
  }

  public handleToggle(): void {
    this.isRegister.update((preVal) => !preVal);
  }

  public handleRegisterSuccess(): void {
    this.isRegister.set(false);
  }
}
