import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginFormModel } from './models/login-form.model';
import { ButtonComponent } from '@app-ui';
import { LoginService } from './services/login.service';
import { ReplaySubject } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { UserStore } from 'src/app/core/stores/user.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'riffle-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  providers: [LoginService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  public readonly user$ = new ReplaySubject<UserModel>(1);
  public loginError: boolean = false;

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
    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.loginService.login(username, password).subscribe({
      next: (user) => {
        this.userStore.setUser(user);
        this.user$.next(user.profile);
        this.loginError = false; // Reset login error on success
      },
      error: (error) => {
        this.loginError = true; // Set login error flag on failure
        console.log('Login Error:', error);
      }
    });
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
