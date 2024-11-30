import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ChannelModel } from '../left-panel/models/channel.model';
import { ChannelApi } from 'src/app/core/api/channel.api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'riffle-admin-channel-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-channel-page.component.html',
  styleUrl: './admin-channel-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminChannelPageComponent {
  public channel: ChannelModel [] = [];

  constructor(
    private channelApi: ChannelApi,
    private cdf: ChangeDetectorRef
  ) {}
  
  public ngOnInit(): void {
    this.channelApi.getChannels().subscribe((channels) => {
      this.channel = channels;
      this.cdf.detectChanges();
    });
  }

  editChannel(channel: any): void {
    console.log('Edit channel:', channel);
    alert(`Editing channel: ${channel.name}`);
  }
  removerChannel(channel: any): void {
    const confirmDelete = confirm(`Are you sure you want to remove ${channel.name}?`);
    if (confirmDelete) {
      this.channel = this.channel.filter(u => u.id !== channel.id);
      console.log('channel removed:', channel);
    }
  }
}
