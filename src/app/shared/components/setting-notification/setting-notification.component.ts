import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToggleComponent } from "../toggle/toggle.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-notification',
  standalone: true,
  imports: [ToggleComponent, RouterLink],
  templateUrl: './setting-notification.component.html',
  styleUrl: './setting-notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingNotificationComponent {
  isChecked = true;
  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }
}
