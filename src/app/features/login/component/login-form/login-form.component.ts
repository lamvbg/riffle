import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFormModel } from './models/login-form.model';
import { ButtonComponent } from '@app-ui';
import { LoginService } from './services/login.service';
import { ReplaySubject } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'riffle-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  providers: [LoginService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public readonly user$ = new ReplaySubject<UserModel>(1);

  public constructor(
    private loginService: LoginService,
    private userStore: UserStore,
  ) {}
  public readonly loginForm = new FormGroup<LoginFormModel>({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public handleLogin(): void {
    this.loginService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value).subscribe({
      next: (value) => {
        this.userStore.setUser(value);
        this.user$.next(value.profile);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public handleGoogleLogin(): void {
    this.loginService.googleLogin();
  }

  public fetchGoogleUser(): void {
    this.loginService.handleGoogleRedirect().subscribe({
      next: (auth) => {
        this.userStore.setUser(auth);
        this.user$.next(auth.profile);
      },
      error: (error) => {
        console.error('Google Login Error:', error);
      },
    });
  }
}
