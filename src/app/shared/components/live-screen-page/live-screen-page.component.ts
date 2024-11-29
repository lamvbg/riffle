import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, OnInit, Input, Signal, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CallingService } from './services/calling.service';
import { SocketService } from '../message-page/services/socket.service';
import { CommonModule } from '@angular/common';
import { HMSSdk, HMSUpdateListener } from '@100mslive/hms-video';
import { Call, StreamVideoClient, StreamVideoParticipant } from '@stream-io/video-client';
import { toSignal } from '@angular/core/rxjs-interop';
import { ParticipantComponent } from "../participant/participant.component";
import { distinctUntilChanged, filter, Observable, of, pipe, switchMap } from 'rxjs';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { ChannelApi } from 'src/app/core/api/channel.api';
import { ChannelModel } from 'src/app/core/models/channel.model';

@Component({
  selector: 'riffle-live-screen-page',
  standalone: true,
  imports: [CommonModule, ParticipantComponent],
  templateUrl: './live-screen-page.component.html',
  styleUrls: ['./live-screen-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveScreenPageComponent {
  @Input({ required: true }) call!: Call;
  public channel: ChannelModel | null = null;

  participants: Observable<StreamVideoParticipant[]> = of([]);

  constructor(
    private callingService: CallingService,
    private channelStore: ChannelStore,
    private channelApi: ChannelApi,
    private cdf: ChangeDetectorRef
  ) {
    this.callingService.rereder.subscribe({
      next: () => {
        this.participants = of([]);
        this.participants = this.callingService.call()!.state.participants$;
      }
    })
  }

  public ngOnInit(): void {
    this.channelStore.getChannel
      .pipe(
        distinctUntilChanged(),
        filter(Boolean),
        switchMap((channelId) => {
          return this.channelApi.getChannel(channelId);
        }),
      )
      .subscribe({
        next: (channel) => {
          this.channel = channel;
          this.cdf.detectChanges();
        },
      });
  }

  toggleMicrophone() {
    this.callingService.toggleMicrophone();
  }

  toggleCamera() {
    this.callingService.toggleScreenShare();
  }

  trackBySessionId(_: number, participant: StreamVideoParticipant) {
    return participant.sessionId;
  }

  leaveCall() {
    this.callingService.setCallId(undefined);
  }
}