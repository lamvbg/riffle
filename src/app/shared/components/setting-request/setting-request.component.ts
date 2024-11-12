import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToggleComponent } from "../toggle/toggle.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-request',
  standalone: true,
  imports: [CommonModule, ToggleComponent, RouterLink],
  templateUrl: './setting-request.component.html',
  styleUrl: './setting-request.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingRequestComponent {
  isChecked = true;
  toggleSwitch() {
    this.isChecked = !this.isChecked;
  }
}
