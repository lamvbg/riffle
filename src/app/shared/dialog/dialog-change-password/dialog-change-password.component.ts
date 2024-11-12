import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordFormModel } from './models/change-password-from.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStore } from 'src/app/core/stores/user.store';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { filter, switchMap } from 'rxjs';
import { ProfileModel } from 'src/app/core/models/profile.model';

@Component({
  selector: 'riffle-dialog-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogChangePasswordComponent {
  public profile: ProfileModel | null = null;

  constructor(
    private dialogRef: MatDialogRef<DialogChangePasswordComponent>,
    private cdr: ChangeDetectorRef,
    private userStore: UserStore,
    private profileApi: ProfileApi
  ) {}

  public readonly changePasswordForm = new FormGroup<ChangePasswordFormModel>({
    oldPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  public changePassword(): void {
    const password = this.changePasswordForm.controls.password.value;
    const confirmPassword = this.changePasswordForm.controls.confirmPassword.value;
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    this.userStore.getUser
      .pipe(
        filter(Boolean),
        switchMap((user) => this.profileApi.getUser(user.profile.profileId)),
        switchMap((profile) => {
          this.profile = profile;
          const {settings, ...profileToUpdate } = profile
          const updatedProfile: Partial<ProfileModel> = {
            ...profileToUpdate,
            password: password as string,
          };
          console.log(updatedProfile)
          return this.profileApi.updateUser(profile.id, updatedProfile);
        })
      )
      .subscribe({
        next: () => {
          this.cdr.detectChanges();
          this.dialogRef.close();
        },
        error: (err) => console.error('Failed to update password:', err),
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
