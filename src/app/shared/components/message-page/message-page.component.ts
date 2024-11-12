import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogUploadComponent } from '../../dialog/dialog-upload/dialog-upload.component';
import { MatDialog } from '@angular/material/dialog';
import { ChannelApi } from 'src/app/core/api/channel.api';
import { ChannelStore } from 'src/app/core/stores/channel.store';
import { distinctUntilKeyChanged, filter, map, switchMap, tap } from 'rxjs';
import { MessageModel } from 'src/app/core/models/message.model';
import { MessageApi } from 'src/app/core/api/message.api';
import { UserStore } from 'src/app/core/stores/user.store';
import { SocketService } from './services/socket.service';
import { ServerStore } from 'src/app/core/stores/server.store';
import { ServerApi } from 'src/app/core/api/server.api';
import { ServerModel } from 'src/app/core/models/server.model';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { ProfileModel } from 'src/app/core/models/profile.model';
@Component({
  selector: 'riffle-message-page',
  standalone: true,
  imports: [
    MessageComponent,
    EmojiPickerComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './message-page.component.html',
  styleUrl: './message-page.component.scss',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagePageComponent {
  public messages: MessageModel[] = [];
  public server: ServerModel | null = null;
  public profile: ProfileModel | null = null;
  public channelName: string = '';
  public message = '';
  public memberId: string = '';
  public channelId = '';

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private channelApi: ChannelApi,
    private channelStore: ChannelStore,
    private userStore: UserStore,
    private serverStore: ServerStore,
    private cdf: ChangeDetectorRef,
    private socketService: SocketService,
    private serverApi: ServerApi,
    private profileApi: ProfileApi,
    private sanitizer: DomSanitizer
  ) {}

  public ngOnInit(): void {
    this.channelStore.getChannel
      .pipe(
        tap(() =>  this.socketService.disconnect()),
        filter(Boolean),
        switchMap((channelId) => {
          return this.channelApi.getChannel(channelId);
        }),
      )
      .subscribe({
        next: (channel) => {
          this.channelId = channel.id;
          this.channelName = `# ${channel.name}`;
          this.messages = channel.messages;
          console.log(channel.messages)
          this.initializeSocketListeners();
          this.cdf.detectChanges();
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

    this.serverStore.getServer
      .pipe(
        filter(Boolean),
        switchMap((serverId) => this.serverApi.getServer(serverId)),
      )
      .subscribe({
        next: (server) => {
          this.server = server;

          const matchingMember = server.members.find(
            (member) => member.profileId === this.profile?.id,
          );

          if (matchingMember) {
            this.memberId = matchingMember.id;
          }
        },
      });
  }

  initializeSocketListeners(): void {
    this.socketService.sendMessage('joinRoom', { channelId: this.channelId });
    this.socketService
      .onMessage('receiveChannelMessage')
      .pipe(tap(console.log), distinctUntilKeyChanged('id'))
      .subscribe((message: MessageModel) => {
        message.safeContent = this.sanitizer.bypassSecurityTrustHtml(message.content);
        this.messages = [...this.messages, message];
        this.cdf.detectChanges();
      });
  }

  sendMessage(): void {
    if (this.message.trim()) {
      const messageData = {
        memberId: this.memberId,
        channelId: this.channelId,
        content: this.message,
      };

      this.socketService.sendMessage('sendChannelMessage', messageData);
      this.message = '';
      this.showEmojiPicker = false;
    }
  }
  

  showEmojiPicker = false;
openDialog(): void {
  const dialogRef = this.dialog.open(DialogUploadComponent);

  dialogRef.componentInstance.fileUploaded.subscribe((uploadedFile) => {
    const messageData = {
      memberId: this.memberId,
      channelId: this.channelId,
      content: `<a href="${uploadedFile.url}" target="_blank">${uploadedFile.name}</a>`,
      fileType: uploadedFile.type,
      fileUrl: uploadedFile.url,
    };
    
    this.socketService.sendMessage('sendChannelMessage', messageData);
  });
}

  

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    if (emoji.startsWith('/images/stickers')) {
      const safeHtmlContent = this.sanitizer.bypassSecurityTrustHtml(
        `<img src="${emoji}" alt="sticker" class="inline-block w-40 h-40" />`
      );
  
      const rawHtmlContent = `<img src="${emoji}" alt="sticker" class="inline-block w-40 h-40" />`;
  
      const messageData = {
        memberId: this.memberId,
        channelId: this.channelId,
        content: rawHtmlContent,
        safeContent: safeHtmlContent 
      };
  
      this.socketService.sendMessage('sendChannelMessage', messageData);
    } else {
      this.message += emoji;
    }
  }
  

  formatTime(date: Date | null): string {
    if (!date) {
      return '';
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date >= today) {
      return `Hôm nay lúc ${this.datePipe.transform(date, 'HH:mm')}`;
    } else if (date >= yesterday) {
      return `Hôm qua lúc ${this.datePipe.transform(date, 'HH:mm')}`;
    } else {
      return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm')!;
    }
  }
}
