import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { MemberModel } from 'src/app/core/models/member.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    this.socket = io('http://localhost:3000/chat', {
      autoConnect: false,
    });
  }

  public connect(): void {
   if(!this.socket.connected) {
    this.socket.connect();
    console.log('Socket connected');
   }
  }

  public joinRoom(channelId: string, type: string, memberId: string): void {
    this.socket.emit('joinRoom', { channelId, type, memberId });
    console.log(`Joining room ${channelId} as member ${memberId}`);
  }
  

public leaveRoom(channelId: string, memberId: string): void {
  this.socket.emit('leaveRoom', { channelId, memberId });
  console.log(`Left room ${channelId} with member ${memberId}`);
}


  public onRoomMembersUpdate(): Observable<MemberModel[]> {
    return new Observable((observer) => {
      this.socket.on('updateRoomMembers', (members) => {
        console.log('Received updateRoomMembers:', members); // Thêm log tại đây
        observer.next(members);
      });
    });
  }
  

  sendMessage(event: string, data: any) {
    this.socket.emit(event, data);
  }

  onMessage(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
  }

  onMessage1(event: string, callback?: (data: any) => void): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        if (callback) {
          callback(data); // Gọi callback nếu được cung cấp
        }
        observer.next(data); // Phát dữ liệu đến Observable
      });
    });
  }
  
  

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
