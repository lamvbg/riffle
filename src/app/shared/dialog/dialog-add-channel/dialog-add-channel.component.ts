import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserStore } from 'src/app/core/stores/user.store';
import { AddChannelFormModel } from './models/add-channel-form.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'riffle-dialog-add-channel',
  standalone: true,
  imports: [],
  templateUrl: './dialog-add-channel.component.html',
  styleUrl: './dialog-add-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddChannelComponent {
  public constructor(
    private dialogRef: MatDialogRef<DialogAddChannelComponent>,
    private cdr: ChangeDetectorRef,
    private userStore: UserStore,
  ) {}

  public readonly addChannelForm = new FormGroup<AddChannelFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  });

  onClose(): void {
    this.dialogRef.close();
  }
}
