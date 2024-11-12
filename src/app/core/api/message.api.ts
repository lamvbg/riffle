import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageModel } from '../models/message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageApi {
  private basedUrl = 'http://localhost:3000/api/messages';
  public constructor(private http: HttpClient) {}

  public getMessages(channelId: string, profileId: string): Observable<MessageModel[]> {
    return this.http.get<MessageModel[]>(`${this.basedUrl}?channelId=${channelId}&profileId=${profileId}`);
  }
}
