import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmojiPickerComponent } from '../emoji-picker/emoji-picker.component';
import { RouterLink } from '@angular/router';
import { ToggleComponent } from '../toggle/toggle.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogChangeAvatarComponent } from '../../dialog/dialog-change-avatar/dialog-change-avatar.component';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { UserStore } from 'src/app/core/stores/user.store';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { SettingModel } from 'src/app/core/models/setting.model';
import { filter, switchMap } from 'rxjs';
import { SettingApi } from 'src/app/core/api/setting.api';

@Component({
  selector: 'riffle-setting-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmojiPickerComponent,
    RouterLink,
    ToggleComponent,
  ],
  templateUrl: './setting-profile.component.html',
  styleUrl: './setting-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingProfileComponent {
  public profile: ProfileModel | null = null;
  public setting: SettingModel[] = [];

  public bannerColor: string = '';
  public displayName: string = '';
  public bio: string = '';
  public status: string = '';

  private originalBannerColor: string = '';
  private originalDisplayName: string = '';
  private originalBio: string = '';
  private originalStatus: string = '';

  constructor(
    public dialog: MatDialog,
    private cdf: ChangeDetectorRef,
    private profileApi: ProfileApi,
    private userStore: UserStore,
    private settingApi: SettingApi,
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
          this.displayName = this.setting[0]?.displayName;
          this.bio = this.setting[0]?.bio;
          this.status = this.setting[0]?.status;

          this.originalBannerColor = this.bannerColor;
          this.originalDisplayName = this.displayName;
          this.originalBio = this.bio;
          this.originalStatus = this.status;
          this.cdf.detectChanges();
        },
      });
  }

  openDialogChangeAvatar(): void {
    this.dialog.open(DialogChangeAvatarComponent);
  }

  isChecked = true;

  showEmojiPicker = false;

  updateBannerColor() {
    console.log(this.bannerColor);
    console.log('Màu biểu ngữ được chọn:', this.bannerColor);
  }

  saveChanges() {
    if (this.profile) {
      const updatedSetting: SettingModel = {
        ...this.setting[0],
        color: this.bannerColor,
        displayName: this.displayName,
        bio: this.bio,
        status: this.status,
      };
      this.settingApi
        .updateSetting(this.profile?.settings[0].id, updatedSetting)
        .subscribe({
          next: (updated) => {
            this.setting[0] = updated;
            this.originalBannerColor = this.bannerColor;
            this.originalDisplayName = this.displayName;
            this.originalBio = this.bio;
            this.originalStatus = this.status;
            this.cdf.detectChanges();
            console.log('Changes saved successfully');
          },
          error: (err) => console.error('Failed to save changes:', err),
        });
    }
  }

  resetChanges() {
    this.bannerColor = this.originalBannerColor;
    this.displayName = this.originalDisplayName;
    this.bio = this.originalBio;
    this.status = this.originalStatus;
  }
  hasChanges(): boolean {
    return (
      this.bannerColor !== this.originalBannerColor ||
      this.displayName !== this.originalDisplayName ||
      this.bio !== this.originalBio ||
      this.status !== this.originalStatus
    );
  }

  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.bio += emoji;
  }
}
