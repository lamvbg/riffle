import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '@app-ui';
import { RegisterFormModel } from './models/register-form.model';

@Component({
  selector: 'riffle-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  public readonly registerForm = new FormGroup<RegisterFormModel>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    displayName: new FormControl('', {
      validators: [Validators.required],
    }),
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public handleSubmit(): void {
    alert(this.registerForm.value);
  }
}
