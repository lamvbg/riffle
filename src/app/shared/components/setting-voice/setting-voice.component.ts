import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-voice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setting-voice.component.html',
  styleUrl: './setting-voice.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingVoiceComponent {

}
