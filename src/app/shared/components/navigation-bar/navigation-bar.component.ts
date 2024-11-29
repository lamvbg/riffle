import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { ServerItemComponent } from '../server-item/server-item.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogAddServerComponent } from '../../dialog/dialog-add-server/dialog-add-server.component';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { filter, map, Observable, Subject, switchMap } from 'rxjs';
import { UserStore } from 'src/app/core/stores/user.store';
import { AsyncPipe } from '@angular/common';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ServerModel } from 'src/app/core/models/server.model';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { DialogJoinServerComponent } from '../../dialog/dialog-join-server/dialog-join-server.component';
import { MemberStore } from 'src/app/core/stores/member.store';

@Component({
  selector: 'riffle-navigation-bar',
  standalone: true,
  imports: [ServerItemComponent, MatTooltip],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent implements OnInit {
  private triggerFetchData$ = new Subject<void>();
  public serverItems: ServerModel[] = [];
  private profileId: string = '';
  constructor(
    public dialog: MatDialog,
    private profileApi: ProfileApi,
    private userStore: UserStore,
    private destroyRef: DestroyRef,
    private cdf: ChangeDetectorRef,
    private serverStore: ServerStore,
    private channelStore: ChannelStore,
    private memberStore: MemberStore,
  ) {}

  public ngOnInit(): void {
    this.triggerFetchData$
      .pipe(
        switchMap(() => this.userStore.getUser),
        filter(Boolean),
        switchMap((user) => {
          return this.profileApi.getServerProfile(user.profile.profileId);
        }),
      )
      .subscribe({
        next: (serverItems: any) => {
          this.serverItems = serverItems as ServerModel[];
          this.cdf.detectChanges();
        },
      });

    this.triggerFetchData$.next();
  }

  public onSelectServer(serverId: string): void {
    this.serverStore.setServer(serverId);

    const firstChannelId = this.serverItems.find(
      (server) => server.id === serverId,
    )?.channels?.[0]?.id;

    this.userStore.getUser.subscribe({
      next: (user) => {
        const currentProfileId = user?.profile?.profileId;

        if (!currentProfileId) return;

        const member = this.serverItems
          .find((server) => server.id === serverId)
          ?.members?.find((member) => member.profileId === currentProfileId);

        if (member) {
          this.memberStore.setMember(member.id);
        } else {
          console.warn('Member not found for the current profile ID');
        }

        if (firstChannelId) {
          this.channelStore.setChannel(firstChannelId);
        }
      },
    });
  }

  openDialog(): void {
    this.dialog
      .open(DialogAddServerComponent)
      .afterClosed()
      .subscribe(() => {
        this.triggerFetchData$.next();
      });
  }

  openDialogJoinServer(): void {
    this.dialog
      .open(DialogJoinServerComponent)
      .afterClosed()
      .subscribe(() => {
        this.triggerFetchData$.next();
      });
  }
}
