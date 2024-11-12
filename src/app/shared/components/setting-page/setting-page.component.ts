import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DialogChangeNameComponent } from '../../dialog/dialog-change-name/dialog-change-name.component';
import { DialogChangePasswordComponent } from '../../dialog/dialog-change-password/dialog-change-password.component';
import { DialogVerifyComponent } from '../../dialog/dialog-verify/dialog-verify.component';
import { DialogChangeMailComponent } from '../../dialog/dialog-change-mail/dialog-change-mail.component';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { UserStore } from 'src/app/core/stores/user.store';
import { filter, map, switchMap } from 'rxjs';
import { SettingModel } from 'src/app/core/models/setting.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'riffle-setting-page',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './setting-page.component.html',
  styleUrl: './setting-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingPageComponent {
  public profile: ProfileModel | null = null;
  public setting: SettingModel[] = [];
  public showEmail = false;
  public bannerColor: string = '';

  constructor(
    public dialog: MatDialog,
    private cdf: ChangeDetectorRef,
    private profileApi: ProfileApi,
    private userStore: UserStore,

  ) {}

  public ngOnInit(): void {
    this.userStore.getUser
      .pipe(
        filter(Boolean),
        switchMap((user) => this.profileApi.getUser(user.profile.profileId)),
      )
      .subscribe({
        next: (profile) => {
          this.profile = profile;
          this.setting = profile.settings;
          this.bannerColor = this.setting[0]?.color;
          console.log(this.bannerColor);
          this.cdf.detectChanges();
        },
      });
  }

  toggleEmailVisibility(): void {
    this.showEmail = !this.showEmail;
  }

  getObfuscatedEmail(): string {
    if (!this.profile?.email) return '';
    
    const [name, domain] = this.profile.email.split('@');
    
    if (!domain) return this.profile.email;
    
    return '*****@' + domain;
  }
  
  
  openDialogChangeName(): void {
    this.dialog.open(DialogChangeNameComponent);
  }

  openDialogChangePassword(): void {
    this.dialog.open(DialogChangePasswordComponent);
  }

  openDialogVerify(): void {
    this.dialog.open(DialogVerifyComponent);
  }

  openDialogChangeMail(): void {
    this.dialog.open(DialogChangeMailComponent);
  }
}
