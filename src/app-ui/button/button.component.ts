import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'riffle-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public label = input.required<string>();
  public disabled = input<boolean>(false);

  public btnClicked = output<void>();

  public handleClick(): void {
    this.btnClicked.emit();
  }
}
