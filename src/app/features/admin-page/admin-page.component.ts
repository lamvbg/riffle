import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdminNavigationBarComponent } from "../../shared/components/admin-navigation-bar/admin-navigation-bar.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'riffle-admin-page',
  standalone: true,
  imports: [AdminNavigationBarComponent, RouterModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {
  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  onPanelClick(view: string) {
    this.router.navigate([view], { relativeTo: this.activatedRoute });
  }

}
