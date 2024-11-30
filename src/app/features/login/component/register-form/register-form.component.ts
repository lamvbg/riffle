import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@app-ui';
import { RegisterFormModel } from './models/register-form.model';
import { RegisterService } from './services/register.service';
import { ReplaySubject } from 'rxjs';
import { UserModel } from 'src/app/core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'riffle-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  providers: [RegisterService],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {

  public readonly user$ = new ReplaySubject<UserModel>(1);

  @Output() public registerSuccess = new ReplaySubject<void>(1);

  public constructor(private register: RegisterService) {}

  public readonly registerForm = new FormGroup<RegisterFormModel>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email,  // Validate email format
      ],
    }),
    displayName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tag: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(6),  // Min password length
      ],
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public handleRegister(): void {
    if (this.registerForm.invalid) {
      // Optionally trigger validation to show errors
      this.registerForm.markAllAsTouched();
      return;
    }

    this.register.register(
      this.registerForm.controls.email.value,
      this.registerForm.controls.displayName.value,
      this.registerForm.controls.tag.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.imageUrl.value,
    ).subscribe({
      next: (value) => {
        this.user$.next(value);
        this.registerSuccess.next();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
