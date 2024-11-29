import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'riffle-member',
  standalone: true,
  imports: [],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberComponent {
  public name = input.required<string>();
  public avatar = input.required<string>();
  public isOnline = input<boolean>(false);
}
