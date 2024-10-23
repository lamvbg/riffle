import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { ButtonComponent } from '@app-ui';
import { RegisterFormComponent } from './component/register-form/register-form.component';

@Component({
  selector: 'riffle-login',
  standalone: true,
  imports: [LoginFormComponent, ButtonComponent, RegisterFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public isRegister = signal(false);

  public handleToggle(): void {
    this.isRegister.update((preVal) => !preVal);
  }
}
