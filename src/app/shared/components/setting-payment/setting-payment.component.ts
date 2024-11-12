import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'riffle-setting-payment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './setting-payment.component.html',
  styleUrl: './setting-payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingPaymentComponent {

}
