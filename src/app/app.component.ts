import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserStore } from './core/stores/user.store';
import { CallingService } from './shared/components/live-screen-page/services/calling.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  callingService: CallingService;
  title = 'riffle';

  public constructor(private userStore: UserStore, private router: Router,
    callingService: CallingService
  ) {
    this.callingService = callingService;
    
    this.userStore.rehyrateAuth();

    this.userStore.getUser.subscribe((user) => {
      if(user) {
        this.router.navigate(['/home']);
      }
    })
  }

  setCallId(callId: string) {
    this.callingService.setCallId(callId);
  }
}
