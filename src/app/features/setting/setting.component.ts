import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { SettingPanelComponent } from '../../shared/components/setting-panel/setting-panel.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'riffle-setting',
  standalone: true,
  imports: [
    SettingPanelComponent,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingComponent {
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  onPanelClick(view: string) {
    this.router.navigate([view], { relativeTo: this.activatedRoute });
  }
}
