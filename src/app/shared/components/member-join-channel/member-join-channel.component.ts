import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'riffle-member-join-channel',
  standalone: true,
  imports: [],
  templateUrl: './member-join-channel.component.html',
  styleUrl: './member-join-channel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberJoinChannelComponent {
  public name = input.required<string>();
  public imageUrl = input.required<string>();
}
