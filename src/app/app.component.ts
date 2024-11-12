import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {ButtonComponent} from '@app-ui';
import { UserStore } from './core/stores/user.store';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'riffle';

  public constructor(private userStore: UserStore, private router: Router) {
    this.userStore.rehyrateAuth();

    this.userStore.getUser.subscribe((user) => {
      if(user) {
        this.router.navigate(['/home']);
      }
    })
  }
}
