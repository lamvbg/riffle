import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { ServerApi } from 'src/app/core/api/server.api';
import { UserStore } from 'src/app/core/stores/user.store';
import { JoinServerFormModel } from './models/join-server-form.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'riffle-dialog-join-server',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './dialog-join-server.component.html',
  styleUrl: './dialog-join-server.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogJoinServerComponent {
  public constructor(
    private dialogRef: MatDialogRef<DialogJoinServerComponent>,

    private userStore: UserStore,
    private serverApi: ServerApi
  ) {}

  public readonly joinServerForm = new FormGroup<JoinServerFormModel>({
    inviteCode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  });

  onClose(): void {
    this.dialogRef.close();
  }

  public joinServer(): void {
    this.userStore.getUser
      .pipe(
        filter(Boolean),
        switchMap((user) => this.serverApi.joinServer(this.joinServerForm.controls.inviteCode.value, user.profile.profileId)),
      )
      .subscribe({
        next: (server) => {
         this.dialogRef.close();
        },
      });
  }

}
