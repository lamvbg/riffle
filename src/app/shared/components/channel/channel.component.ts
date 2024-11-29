import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditChannelComponent } from '../../dialog/dialog-edit-channel/dialog-edit-channel.component';
import { filter, Subject, switchMap, take } from 'rxjs';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { ChannelApi } from 'src/app/core/api/channel.api';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ServerApi } from 'src/app/core/api/server.api';
import { DialogInviteCodeComponent } from '../../dialog/dialog-invite-code/dialog-invite-code.component';

@Component({
  selector: 'riffle-channel',
  standalone: true,
  imports: [],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelComponent {
  private triggerRefetchData$ = new Subject<void>();

  @Input() name!: string;
  @Input() type!: string;

  private isDialogOpen = false;

  constructor(
    private cdf: ChangeDetectorRef,
    public dialog: MatDialog,
    public channelStore: ChannelStore,
    public channelApi: ChannelApi,
    public serverStore: ServerStore,
    public serverApi: ServerApi,
  ) {}

  public openDialog(): void {
    if (this.isDialogOpen) return;

    this.isDialogOpen = true;

    this.channelStore.getChannel
      .pipe(
        take(1),
        switchMap((channelId) => this.channelApi.getChannel(channelId)),
        switchMap((data) =>
          this.dialog.open(DialogEditChannelComponent, { data }).afterClosed(),
        ),
      )
      .subscribe((value) => {
        this.isDialogOpen = false;
        if (!value) return;

        this.triggerRefetchData$.next();
      });
  }

  public openDialogInviteCode(): void {
    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => this.serverApi.getServer(serverId)),
        switchMap((data) =>
          this.dialog.open(DialogInviteCodeComponent, { data }).afterClosed(),
        ),
      )
      .subscribe((value) => {
        if (!value) return;

        this.triggerRefetchData$.next();
      });
  }
}
