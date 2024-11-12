import { Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { SettingPageComponent } from 'src/app/shared/components/setting-page/setting-page.component';
import { SettingProfileComponent } from 'src/app/shared/components/setting-profile/setting-profile.component';
import { SettingRequestComponent } from 'src/app/shared/components/setting-request/setting-request.component';
import { SettingNitroComponent } from 'src/app/shared/components/setting-nitro/setting-nitro.component';
import { SettingVoiceComponent } from 'src/app/shared/components/setting-voice/setting-voice.component';
import { SettingLanguageComponent } from 'src/app/shared/components/setting-language/setting-language.component';
import { SettingRegisterComponent } from 'src/app/shared/components/setting-register/setting-register.component';
import { SettingPaymentComponent } from 'src/app/shared/components/setting-payment/setting-payment.component';
import { SettingNotificationComponent } from 'src/app/shared/components/setting-notification/setting-notification.component';

export const settingRoutes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'page',
      },
      {
        path: 'page',
        component: SettingPageComponent,
      },
      {
        path: 'profile',
        component: SettingProfileComponent,
      },
      {
        path: 'request',
        component: SettingRequestComponent,
      },
      {
        path: 'nitro',
        component: SettingNitroComponent,
      },
      {
        path: 'voice',
        component: SettingVoiceComponent,
      },
      {
        path: 'language',
        component: SettingLanguageComponent,
      },
      {
        path: 'register',
        component: SettingRegisterComponent,
      },
      {
        path: 'payment',
        component: SettingPaymentComponent,
      },
      {
        path: 'notification',
        component: SettingNotificationComponent,
      }
    ]
  },
];
