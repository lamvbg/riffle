import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChannelModel, ChannelType } from '../models/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelApi {
  private basedUrl = 'http://localhost:3000/api/channels';
  public constructor(private http: HttpClient) {}

  public createChannel(
    name: string,
    type: ChannelType,
    profileId: string,
    serverId: string,
  ): Observable<ChannelModel> {
    return this.http.post<ChannelModel>(`${this.basedUrl}/${serverId}`, {
        name,
        type,
        profileId,
    });
  }

  public getChannels(): Observable<ChannelModel[]> {
    return this.http.get<ChannelModel[]>(`${this.basedUrl}`);
  }

  public getChannel(channelId: string): Observable<ChannelModel> {
    return this.http.get<ChannelModel>(`${this.basedUrl}/${channelId}`);
  }
  
  public updateChannel(channelId: string, name: string, type: ChannelType): Observable<ChannelModel> {
    return this.http.patch<ChannelModel>(`${this.basedUrl}/${channelId}`, { 
        name,
        type
     });
  }

  public deleteChannel(channelId: string): Observable<ChannelModel> {
    return this.http.delete<ChannelModel>(`${this.basedUrl}/${channelId}`);
  }
}
