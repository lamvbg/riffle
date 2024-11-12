import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { SettingPanelComponent } from '../../shared/components/setting-panel/setting-panel.component';
import { SettingPageComponent } from '../../shared/components/setting-page/setting-page.component';
import { SettingProfileComponent } from '../../shared/components/setting-profile/setting-profile.component';
import { CommonModule } from '@angular/common';
import { SettingRequestComponent } from '../../shared/components/setting-request/setting-request.component';
import { SettingNitroComponent } from '../../shared/components/setting-nitro/setting-nitro.component';
import { SettingVoiceComponent } from '../../shared/components/setting-voice/setting-voice.component';
import { SettingLanguageComponent } from '../../shared/components/setting-language/setting-language.component';
import { SettingRegisterComponent } from '../../shared/components/setting-register/setting-register.component';
import { SettingPaymentComponent } from '../../shared/components/setting-payment/setting-payment.component';
import { SettingNotificationComponent } from '../../shared/components/setting-notification/setting-notification.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'riffle-setting',
  standalone: true,
  imports: [
    SettingPanelComponent,
    SettingPageComponent,
    SettingProfileComponent,
    CommonModule,
    SettingRequestComponent,
    SettingNitroComponent,
    SettingVoiceComponent,
    SettingLanguageComponent,
    SettingRegisterComponent,
    SettingPaymentComponent,
    SettingNotificationComponent,
    RouterModule,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent {
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  onPanelClick(view: string) {
    this.router.navigate([view], { relativeTo: this.activatedRoute });
  }
}
