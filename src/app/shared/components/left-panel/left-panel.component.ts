import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  output,
  Output,
} from '@angular/core';
import { ChannelModel } from './models/channel.model';
import { ChannelComponent } from '../channel/channel.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  distinct,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  switchMap,
} from 'rxjs';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ServerApi } from 'src/app/core/api/server.api';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { UserStore } from 'src/app/core/stores/user.store';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddChannelComponent } from '../../dialog/dialog-add-channel/dialog-add-channel.component';
import { DialogEditServerComponent } from '../../dialog/dialog-edit-server/dialog-edit-server.component';
import { MemberApi } from 'src/app/core/api/member.api';
import { MemberModel } from 'src/app/core/models/member.model';
import { ChannelType } from 'src/app/core/models/channel.model';
import { MemberJoinChannelComponent } from '../member-join-channel/member-join-channel.component';
import { SocketService } from '../message-page/services/socket.service';
import { MemberStore } from 'src/app/core/stores/member.store';
import { CallingService } from '../live-screen-page/services/calling.service';

@Component({
  selector: 'riffle-left-panel',
  standalone: true,
  imports: [
    ChannelComponent,
    CommonModule,
    RouterLink,
    MemberJoinChannelComponent,
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelComponent implements OnInit {
  private triggerRefetchData$ = new Subject<void>();
  public channelItems: ChannelModel[] = [];
  public profile: ProfileModel | null = null;
  public members: MemberModel[] = [];
  public serverName = '';
  public selectedChannelId: string = '';
  public selectedChannelType: ChannelType = ChannelType.TextChannels;

  public channelChanged = output<{
    channelId: string;
    channelType: ChannelType;
    memberId: string;
  }>();
  constructor(
    private socketService: SocketService,
    private serverStore: ServerStore,
    private cdf: ChangeDetectorRef,
    private serverApi: ServerApi,
    private memberApi: MemberApi,
    private channelStore: ChannelStore,
    private userStore: UserStore,
    private profileApi: ProfileApi,
    public dialog: MatDialog,
    private memberStore: MemberStore,
    private callingService: CallingService,
  ) {}

  public ngOnInit(): void {
    this.socketService.onRoomMembersUpdate().subscribe((members) => {
      this.members = members;
      this.cdf.detectChanges();
      console.log(
        'Updated room members for channel',
        this.selectedChannelId,
        this.members,
      );
    });

    this.triggerRefetchData$
      .pipe(
        switchMap(() => this.serverStore.getServer),
        filter(Boolean),
        switchMap((serverId) => {
          return this.serverApi.getServer(serverId);
        }),
        map((server) => {
          this.serverName = server.name;
          return server.channels.map((channel) => ({
            ...channel,
            type: channel?.type,
          }));
        }),
      )
      .subscribe({
        next: (value) => {
          this.channelItems = value;
          this.cdf.detectChanges();

          if (this.channelItems.length > 0) {
            this.channelStore.setChannel(this.channelItems[0].id);
          }
        },
      });

    this.userStore.getUser
      .pipe(
        filter(Boolean),
        switchMap((user) => this.profileApi.getUser(user.profile.profileId)),
      )
      .subscribe({
        next: (profile) => {
          this.profile = profile;
          this.cdf.detectChanges();
        },
      });

    this.triggerRefetchData$.next();
  }

  public openDialog(): void {
    this.dialog
      .open(DialogAddChannelComponent)
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;

        this.triggerRefetchData$.next();
      });
  }

  public openDialogSetting(): void {
    this.serverStore.getServer
      .pipe(
        switchMap((serverId) => {
          return this.serverApi.getServer(serverId).pipe(
            switchMap((server) => {
              return this.memberApi
                .getMembers(serverId)
                .pipe(map((members) => ({ server, members })));
            }),
          );
        }),
        switchMap((data) =>
          this.dialog.open(DialogEditServerComponent, { data }).afterClosed(),
        ),
      )
      .subscribe((value) => {
        if (!value) return;

        this.triggerRefetchData$.next();
      });
  }

  public onSelectChannel(channelId: string, type: ChannelType): void {
    if (this.selectedChannelId) {
      this.memberStore.getMember.pipe(filter(Boolean)).subscribe((memberId) => {
        this.callingService.disconnectUser();
        this.socketService.leaveRoom(this.selectedChannelId, memberId);
        console.log(
          `Left room ${this.selectedChannelId} with member ${memberId}`,
        );
      });
    }

    this.selectedChannelId = channelId;
    this.selectedChannelType = type;

    this.memberStore.getMember
      .pipe(filter(Boolean))
      .subscribe(async (memberId) => {
        this.socketService.joinRoom(channelId, type, memberId);
        try {
          this.callingService.setCallId(channelId);
          await this.callingService.initializeClient(channelId, memberId);
        } catch (error) {
          console.error('Failed to initialize client for channel:', error);
        }

        this.channelChanged.emit({ channelId, memberId, channelType: type });
      });

    this.channelStore.setChannel(channelId);
  }

  public refetch(): void {
    this.triggerRefetchData$.next();
  }

  micOn = true;
  headphoneOn = true;

  toggleMic() {
    this.micOn = !this.micOn;
  }

  toggleHeadphone() {
    this.headphoneOn = !this.headphoneOn;
  }
}
