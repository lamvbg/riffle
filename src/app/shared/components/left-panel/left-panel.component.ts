import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ChannelModel } from './models/channel.model';
import { ChannelComponent } from '../channel/channel.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { filter, map, Subject, switchMap } from 'rxjs';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ServerApi } from 'src/app/core/api/server.api';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { UserStore } from 'src/app/core/stores/user.store';
import { ProfileModel } from 'src/app/core/models/profile.model';

@Component({
  selector: 'riffle-left-panel',
  standalone: true,
  imports: [ChannelComponent, CommonModule, RouterLink],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPanelComponent implements OnInit {
  public channelItems: ChannelModel[] = [];
  public profile: ProfileModel | null = null; 
  public serverName = '';
  constructor(
    private serverStore: ServerStore,
    private cdf: ChangeDetectorRef,
    private serverApi: ServerApi,
    private channelStore: ChannelStore,
    private userStore: UserStore,
    private profileApi: ProfileApi
  ) {}

  public ngOnInit(): void {
    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => {
          return this.serverApi.getServer(serverId);
        }),
        map((server) => {
          this.serverName = server.name;
          return server.channels;
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
        switchMap((user) => this.profileApi.getUser(user.profile.profileId))
      )
      .subscribe({
        next: (profile) => {
          this.profile = profile;
          this.cdf.detectChanges();
        },
      });

  }

  public onSelectChannel(channelId: string): void {
    this.channelStore.setChannel(channelId);
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
