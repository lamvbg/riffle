import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'riffle-admin-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navigation-bar.component.html',
  styleUrl: './admin-navigation-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminNavigationBarComponent {
  @Input() currentView!: string;
  @Output() menuClick = new EventEmitter<string>();

  selectView(view: string) {
    this.menuClick.emit(view);
  }
}
