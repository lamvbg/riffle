import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'riffle-section',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './section.component.html',
  styleUrl: './section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  public title = input.required<string>();
  public layout = input<'flex' | 'flex-row-reverse'>('flex');
  public video = input.required<string>();
  public description = input.required<string>();
}
