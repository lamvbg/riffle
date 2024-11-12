import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setting-register.component.html',
  styleUrl: './setting-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingRegisterComponent {

}
