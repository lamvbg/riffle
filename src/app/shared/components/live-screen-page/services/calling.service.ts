import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  private apiKey = 'ezc3czdn98xg';

  callId = signal<string | undefined>(undefined);
  client: StreamVideoClient | null = new StreamVideoClient({ apiKey: this.apiKey });

  public rereder = new Subject<void>();

  call = computed<Call | undefined>(() => {
    const currentCallId = this.callId();
    console.log(currentCallId, this.client);
    if (currentCallId && this.client) {
      const call = this.client.call('default', currentCallId);
      call.join({ create: true }).then(async () => {
        call.camera.disable();
        call.microphone.enable();
        call.screenShare.disable();
      });
      return call;
    } else {
      return undefined;
    }
  });

  constructor(private http: HttpClient) {}

  async initializeClient(channelId: string, userId: string) {
    // Ngắt kết nối client cũ nếu đã tồn tại
    if (this.client) {
      await this.disconnectUser();
    }

    // Tạo client mới
    this.client = new StreamVideoClient({ apiKey: this.apiKey });

    // Lấy token từ server
    const response = await this.http
      .post<{ token: string }>('http://localhost:3000/api/stream/generate-token', {
        userId,
      })
      .toPromise();

    const token = response?.token;
    if (token) {
      const user: User = { id: userId };
      await this.client.connectUser(user, token);
      this.rereder.next();
      this.setCallId(channelId); // Gắn channelId làm callId
    } else {
      throw new Error('Failed to retrieve token from server.');
    }
  }

  async disconnectUser() {
    if (this.client) {
      await this.client.disconnectUser(); // Ngắt kết nối user hiện tại
    }
  }

  setCallId(callId: string | undefined) {
    if (callId === undefined) {
      this.call()?.leave();
    }
    console.log(callId)
    this.callId.set(callId);
  }

  toggleCamera() {
    this.call()?.camera.toggle();
  }

  toggleMicrophone() {
    this.call()?.microphone.toggle();
  }

  toggleScreenShare() {
    this.call()?.screenShare.toggle();
  }
}
