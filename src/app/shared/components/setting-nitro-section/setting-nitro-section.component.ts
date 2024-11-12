import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'riffle-setting-nitro-section',
  standalone: true,
  imports: [],
  templateUrl: './setting-nitro-section.component.html',
  styleUrl: './setting-nitro-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingNitroSectionComponent {
  public title = input.required<string>()
  public description = input.required<string>()
  public image = input.required<string>()
}
