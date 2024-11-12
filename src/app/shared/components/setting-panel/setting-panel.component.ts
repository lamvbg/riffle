import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserStore } from 'src/app/core/stores/user.store';

@Component({
  selector: 'riffle-setting-panel',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './setting-panel.component.html',
  styleUrls: ['./setting-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingPanelComponent {
  public constructor(
    public userStore: UserStore,
  ) {}
  @Input() currentView!: string;
  @Output() menuClick = new EventEmitter<string>();

  selectView(view: string) {
    this.menuClick.emit(view);
  }

  public handleLogout(): void {
    this.userStore.removeUser();
  }
}
