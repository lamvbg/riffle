import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { SettingPageComponent } from './setting-page.component';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { UserStore } from 'src/app/core/stores/user.store';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { DialogChangeNameComponent } from '../../dialog/dialog-change-name/dialog-change-name.component';
import { DialogChangePasswordComponent } from '../../dialog/dialog-change-password/dialog-change-password.component';
import { DialogVerifyComponent } from '../../dialog/dialog-verify/dialog-verify.component';
import { DialogChangeMailComponent } from '../../dialog/dialog-change-mail/dialog-change-mail.component';

describe('SettingPageComponent', () => {
  let component: SettingPageComponent;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let cdfSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let profileApiSpy: jasmine.SpyObj<ProfileApi>;
  let userStoreSpy: jasmine.SpyObj<UserStore>;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    cdfSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    profileApiSpy = jasmine.createSpyObj('ProfileApi', ['getUser']);
    userStoreSpy = jasmine.createSpyObj('UserStore', ['getUser']);

    TestBed.configureTestingModule({
      providers: [
        SettingPageComponent,
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ChangeDetectorRef, useValue: cdfSpy },
        { provide: ProfileApi, useValue: profileApiSpy },
        { provide: UserStore, useValue: userStoreSpy },
      ],
    });

    component = TestBed.inject(SettingPageComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should fetch and set profile data', () => {
      const mockProfile: ProfileModel = {
          profileId: '123',
          email: 'test@example.com',
          settings: [{
              color: 'blue',
              id: '',
              displayName: '',
              bio: '',
              status: '',
              profileId: ''
          }],
          id: '',
          createdAt: '',
          servers: [],
          name: '',
          userId: '',
          password: '',
          imageUrl: ''
      };

      userStoreSpy.getUser = of({ profile: { profileId: '123' } }) as any;
      profileApiSpy.getUser.and.returnValue(of(mockProfile));

      component.ngOnInit();

      expect(profileApiSpy.getUser).toHaveBeenCalledWith('123');
      expect(component.profile).toEqual(mockProfile);
      expect(component.bannerColor).toBe('blue');
      expect(cdfSpy.detectChanges).toHaveBeenCalled();
    });
  });

  describe('toggleEmailVisibility', () => {
    it('should toggle the visibility of email', () => {
      expect(component.showEmail).toBeFalse();

      component.toggleEmailVisibility();
      expect(component.showEmail).toBeTrue();

      component.toggleEmailVisibility();
      expect(component.showEmail).toBeFalse();
    });
  });

  describe('getObfuscatedEmail', () => {
    it('should return obfuscated email', () => {
      component.profile = { email: 'user@example.com' } as ProfileModel;

      const result = component.getObfuscatedEmail();
      expect(result).toBe('*****@example.com');
    });

    it('should return empty string if email is missing', () => {
      component.profile = null;

      const result = component.getObfuscatedEmail();
      expect(result).toBe('');
    });
  });

  describe('Dialog interactions', () => {
    it('should open DialogChangeNameComponent', () => {
      component.openDialogChangeName();
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogChangeNameComponent);
    });

    it('should open DialogChangePasswordComponent', () => {
      component.openDialogChangePassword();
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogChangePasswordComponent);
    });

    it('should open DialogVerifyComponent', () => {
      component.openDialogVerify();
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogVerifyComponent);
    });

    it('should open DialogChangeMailComponent', () => {
      component.openDialogChangeMail();
      expect(dialogSpy.open).toHaveBeenCalledWith(DialogChangeMailComponent);
    });
  });
});
