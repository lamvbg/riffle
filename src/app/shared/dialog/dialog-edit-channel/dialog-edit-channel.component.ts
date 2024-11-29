import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ChannelApi } from 'src/app/core/api/channel.api';
import { ChannelModel, ChannelType } from 'src/app/core/models/channel.model';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { ServerStore } from 'src/app/core/stores/server.store';
import { UserStore } from 'src/app/core/stores/user.store';
import { AddChannelFormModel } from '../dialog-add-channel/models/add-channel-form.model';
import { filter, switchMap } from 'rxjs';
import { EditChannelService } from './services/edit-channel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'riffle-dialog-edit-channel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [EditChannelService],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEditChannelComponent {
  public ChannelType = ChannelType;
  public channel: ChannelModel | null = null;
  public name: string = '';
  public type: ChannelType = ChannelType.TextChannels;
  public constructor(
    private dialogRef: MatDialogRef<DialogEditChannelComponent>,
    private cdr: ChangeDetectorRef,
    private channelStore: ChannelStore,
    private editChannelService: EditChannelService,
    private userStore: UserStore,
    private serverStore: ServerStore,
    private channelApi: ChannelApi,
    @Inject(MAT_DIALOG_DATA) public data: ChannelModel,
  ) {
    this.channel = data;
    this.name = data.name;
    this.type = data.type;
  }

  public readonly editChannelForm = new FormGroup<AddChannelFormModel>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    type: new FormControl(this.type, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onClose(): void {
    this.dialogRef.close();
  }

  public editChannel(): void {
    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => 
          this.channelStore.getChannel.pipe(
            filter(Boolean),
            switchMap((channelId) => {
              return this.editChannelService.editChannel(
                channelId,
                serverId,
                this.editChannelForm.controls.name.value,
                this.editChannelForm.controls.type.value,
              );
            }),
          )
        ),
      )
      .subscribe({
        next: (channel) => {
          this.dialogRef.close(true);
        },
      });
  }
}
