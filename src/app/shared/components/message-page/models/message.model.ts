import { SafeHtml } from "@angular/platform-browser";

export interface MessageModel {
    name: string;
    image: string;
    content: string | SafeHtml;
    time: Date;
}