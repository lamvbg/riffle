import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { StreamVideoParticipant } from '@stream-io/video-client';
import { CallingService } from '../live-screen-page/services/calling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'riffle-participant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParticipantComponent implements AfterViewInit, OnDestroy {
  private _channelID: string | undefined;
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('audioElement', { static: false }) audioElement!: ElementRef<HTMLAudioElement>;

  @Input() participant!: StreamVideoParticipant;
  unbindVideoElement: (() => void) | undefined;
  unbindAudioElement: (() => void) | undefined;

  // @Input() set channelId(channelID: string | undefined) { 
  //   if(channelID && this._channelID !== channelID) {
  //     this._channelID = channelID;
  //     console.log(this.videoElement.nativeElement)
  //     this.unbindVideoElement = this.callingService
  //       .call()
  //       ?.bindVideoElement(
  //         this.videoElement?.nativeElement,
  //         this.participant.sessionId,
  //         'videoTrack'
  //       );

  //     this.unbindAudioElement = this.callingService
  //       .call()
  //       ?.bindAudioElement(
  //         this.audioElement?.nativeElement,
  //         this.participant.sessionId
  //       );

  //       this.cdf.detectChanges();
  //   }
  // }

  constructor(private callingService: CallingService, private cdf: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.videoElement) {
      this.unbindVideoElement = this.callingService
        .call()
        ?.bindVideoElement(
          this.videoElement?.nativeElement,
          this.participant.sessionId,
          'videoTrack'
        );

      this.unbindAudioElement = this.callingService
        .call()
        ?.bindAudioElement(
          this.audioElement?.nativeElement,
          this.participant.sessionId
        );
    }
  }

  ngOnDestroy(): void {
    this.unbindVideoElement?.();
    this.unbindAudioElement?.();
  }
}
