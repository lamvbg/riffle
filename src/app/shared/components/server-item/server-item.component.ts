import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'riffle-server-item',
  standalone: true,
  imports: [],
  templateUrl: './server-item.component.html',
  styleUrl: './server-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerItemComponent {
  public iconSrc = input.required<string>();
  public altText = input.required<string>();
}
