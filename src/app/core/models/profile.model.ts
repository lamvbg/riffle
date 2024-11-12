import { UserModel } from './user.model';
import { ServerModel } from './server.model';
import { SettingModel } from './setting.model';

export interface ProfileModel extends UserModel {
  id: string;
  createdAt: string;
  servers: ServerModel[];
  settings: SettingModel[];
}
