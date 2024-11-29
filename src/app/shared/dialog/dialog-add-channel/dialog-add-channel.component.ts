import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserStore } from 'src/app/core/stores/user.store';
import { AddChannelFormModel } from './models/add-channel-form.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { AddChannelService } from './services/add-channel.service';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ChannelModel, ChannelType } from 'src/app/core/models/channel.model';

@Component({
  selector: 'riffle-dialog-add-channel',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AddChannelService],
  templateUrl: './dialog-add-channel.component.html',
  styleUrl: './dialog-add-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogAddChannelComponent {
  public channel: ChannelModel | null = null;
  public ChannelType = ChannelType;
  public constructor(
    private dialogRef: MatDialogRef<DialogAddChannelComponent>,
    private cdr: ChangeDetectorRef,
    private userStore: UserStore,
    private serverStore: ServerStore,
    private addChannelService: AddChannelService,
  ) {}

  public readonly addChannelForm = new FormGroup<AddChannelFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl(ChannelType.TextChannels, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onClose(): void {
    this.dialogRef.close();
  }

  public addChannel(): void {
    this.serverStore.getServer
    .pipe(
      filter(Boolean),
      switchMap((serverId) =>
        this.userStore.getUser.pipe(
          filter(Boolean),
          switchMap((user) => {
            const channelData = {
              name: this.addChannelForm.controls.name.value,
              type: this.addChannelForm.controls.type.value,
              profileId: user.profile.profileId,
            };
            return this.addChannelService.addChannel(serverId, channelData);
          }),
        ),
      ),
    )
    .subscribe({
      next: (channel) => {
        this.channel = channel;
        this.dialogRef.close(true);
      },
    });
  }
}
