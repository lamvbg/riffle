import { ChannelType } from "src/app/core/models/channel.model";

export interface ChannelModel {
    name: string;
    type: ChannelType;
    id: string;
}