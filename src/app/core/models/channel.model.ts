import { MessageModel } from "./message.model";

export enum ChannelType {
    TextChannels = 'TEXT',
    AudioChannels = 'AUDIO',
    VideoChannels = 'VIDEO',
}
export interface ChannelModel {
    id: string;
    name: string;
    type: ChannelType;
    profileId: string;
    serverId: string;
    messages: MessageModel[];
}