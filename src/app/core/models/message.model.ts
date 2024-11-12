import { SafeHtml } from "@angular/platform-browser";
import { MemberModel } from "./member.model";

export interface MessageModel {
    id: string;
    content: string;
    safeContent?: SafeHtml;
    fileUrl: string;
    channelId: string;
    createdAt: Date;
    memberId: string;
    member: MemberModel;
}