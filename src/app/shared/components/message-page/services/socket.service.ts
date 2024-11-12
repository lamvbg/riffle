import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

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

  sendMessage(event: string, data: any) {
    if (this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      this.socket.connect();
      this.socket.on('connect', () => {
        this.socket.emit(event, data);
      });
    }
  }

  onMessage(event: string): Observable<any> {
    return new Observable((observer) => {
     if(!this.socket.connected) {
      this.socket.connect();
     }
     this.socket.on('connect', () => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });
    });
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
