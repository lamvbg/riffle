import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DialogAddChannelComponent } from './dialog-add-channel.component';
import { UserStore } from 'src/app/core/stores/user.store';
import { ServerStore } from 'src/app/core/stores/server.store';
import { AddChannelService } from './services/add-channel.service';
import { ChannelType } from 'src/app/core/models/channel.model';

describe('DialogAddChannelComponent', () => {
  let component: DialogAddChannelComponent;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogAddChannelComponent>>;
  let cdrSpy: jasmine.SpyObj<ChangeDetectorRef>;
  let userStoreSpy: jasmine.SpyObj<UserStore>;
  let serverStoreSpy: jasmine.SpyObj<ServerStore>;
  let addChannelServiceSpy: jasmine.SpyObj<AddChannelService>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    cdrSpy = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);
    
    userStoreSpy = jasmine.createSpyObj('UserStore', ['getUser']);
    Object.defineProperty(userStoreSpy, 'getUser', { value: of({ profile: { profileId: '123' } }) });

    serverStoreSpy = jasmine.createSpyObj('ServerStore', ['getServer']);
    Object.defineProperty(serverStoreSpy, 'getServer', { value: of('server-123') });

    addChannelServiceSpy = jasmine.createSpyObj('AddChannelService', ['addChannel']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        DialogAddChannelComponent,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: ChangeDetectorRef, useValue: cdrSpy },
        { provide: UserStore, useValue: userStoreSpy },
        { provide: ServerStore, useValue: serverStoreSpy },
        { provide: AddChannelService, useValue: addChannelServiceSpy },
      ],
    });

    component = TestBed.inject(DialogAddChannelComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onClose', () => {
    it('should close the dialog', () => {
      component.onClose();
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });
  });

  describe('addChannel', () => {
    it('should add a channel and close the dialog on success', () => {
      const mockChannel = { id: 'channel-123', name: 'Test Channel', type: ChannelType.TextChannels, profileId: '123', serverId: 'server-123', messages:[] };
      addChannelServiceSpy.addChannel.and.returnValue(of(mockChannel));

      component.addChannelForm.controls.name.setValue('Test Channel');
      component.addChannelForm.controls.type.setValue(ChannelType.TextChannels);

      component.addChannel();

      expect(serverStoreSpy.getServer).toBeTruthy();
      expect(userStoreSpy.getUser).toBeTruthy();
      expect(addChannelServiceSpy.addChannel).toHaveBeenCalledWith('server-123', {
        name: 'Test Channel',
        type: ChannelType.TextChannels,
        profileId: '123',
      });

      expect(component.channel).toEqual(mockChannel);
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    });
  });

  describe('Form validation', () => {
    it('should mark form as invalid if name is empty', () => {
      component.addChannelForm.controls.name.setValue('');
      expect(component.addChannelForm.invalid).toBeTrue();
    });

    it('should mark form as valid with correct inputs', () => {
      component.addChannelForm.controls.name.setValue('Valid Name');
      component.addChannelForm.controls.type.setValue(ChannelType.TextChannels);
      expect(component.addChannelForm.valid).toBeTrue();
    });
  });
});
