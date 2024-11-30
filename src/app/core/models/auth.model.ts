import { UserModel } from "./user.model";

export interface AuthModel {
    access_token: string;
    profile: any;
}