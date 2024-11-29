import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NavigationBarComponent} from '../../shared/components/navigation-bar/navigation-bar.component';
import { LeftPanelComponent } from "../../shared/components/left-panel/left-panel.component";
import { MessagePageComponent } from "../../shared/components/message-page/message-page.component";
import { RightPannelComponent } from "../../shared/components/right-pannel/right-pannel.component";
import { LiveScreenPageComponent } from "../../shared/components/live-screen-page/live-screen-page.component";
import { ChannelType } from 'src/app/core/models/channel.model';
import { Call } from '@stream-io/video-client';
import { CallingService } from 'src/app/shared/components/live-screen-page/services/calling.service';

@Component({
  selector: 'riffle-home',
  standalone: true,
  imports: [NavigationBarComponent, LeftPanelComponent, MessagePageComponent, RightPannelComponent, LiveScreenPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  selectedChannelType: ChannelType = ChannelType.TextChannels;
  call!: Call;

  constructor(private callingService: CallingService) {
    // const currentCall = this.callingService.call();
    // if (currentCall) {
    //   this.call = currentCall; // Gán giá trị nếu không phải undefined
    // }
  }
  onChannelChanged(event: { channelId: string; channelType: ChannelType }): void {
    this.selectedChannelType = event.channelType;
  }
}
