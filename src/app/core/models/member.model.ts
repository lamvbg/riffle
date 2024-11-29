import { MessageModel } from "./message.model";
import { ProfileModel } from "./profile.model";
import { ServerModel } from "./server.model";

export enum MemberRole {
    admin = 'ADMIN',
    moderator = 'MODERATOR',
    guest = 'GUEST',
}
export interface MemberModel {
    id: string,
    role: MemberRole,
    isOnline: boolean,
    profileId: string,
    server: ServerModel,
    profile: ProfileModel
}
