import { ChannelModel } from "./channel.model";
import { MemberModel } from "./member.model";

export interface ServerModel {
    id: string,
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    createAt: Date;
    channels: ChannelModel[];
    members: MemberModel[];
}