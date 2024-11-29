import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChannelApi } from "src/app/core/api/channel.api";
import { ChannelModel, ChannelType } from "src/app/core/models/channel.model";

@Injectable()
export class EditChannelService {
    public constructor(private channelApi: ChannelApi) {}

    public editChannel(channelId: string, serverId: string, name: string, type: ChannelType): Observable<ChannelModel> {
        return this.channelApi.updateChannel(channelId, serverId, name, type);
    }
}