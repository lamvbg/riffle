import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'riffle-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent {

}
