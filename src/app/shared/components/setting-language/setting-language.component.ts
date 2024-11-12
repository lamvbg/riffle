import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-language',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setting-language.component.html',
  styleUrl: './setting-language.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingLanguageComponent {

}
