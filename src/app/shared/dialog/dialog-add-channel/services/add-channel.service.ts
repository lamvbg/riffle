import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChannelApi } from "src/app/core/api/channel.api";
import { ChannelModel, ChannelType } from "src/app/core/models/channel.model";

@Injectable()
export class AddChannelService {
    public constructor(private readonly channelApi: ChannelApi) {}

    public addChannel(serverId: string, channelData: { name: string; type: ChannelType; profileId: string }): Observable<ChannelModel> {
        return this.channelApi.createChannel(serverId, channelData);
    }
}