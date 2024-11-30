import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { ProfileModel } from 'src/app/core/models/profile.model';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'riffle-admin-user-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-user-page.component.html',
  styleUrl: './admin-user-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserPageComponent {
  public profile: ProfileModel[] = [];

  constructor(
    private userStore: UserStore,
    private profileApi: ProfileApi,
    private cdf: ChangeDetectorRef,
  ) {}
  public ngOnInit(): void {
    this.profileApi.getUsers().subscribe({
      next: (profile) => {
        this.profile = profile;
        this.cdf.detectChanges();
      },
    });
  }

  editUser(user: any): void {
    console.log('Edit user:', user);
    alert(`Editing user: ${user.name}`);
  }

  // Hàm xóa người dùng
  removeUser(user: any): void {
    const confirmDelete = confirm(`Are you sure you want to remove ${user.name}?`);
    if (confirmDelete) {
      this.profile = this.profile.filter(u => u.id !== user.id);
      console.log('User removed:', user);
    }
  }
}
