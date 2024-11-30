import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatRippleLoader } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, ReplaySubject, switchMap } from 'rxjs';
import { ProfileApi } from 'src/app/core/api/profile.api';
import { UserModel } from 'src/app/core/models/user.model';
import { UserStore } from 'src/app/core/stores/user.store';
import { LoginService } from 'src/app/features/login/component/login-form/services/login.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'riffle-login-callback',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  providers: [LoginService],
  templateUrl: './login-callback.component.html',
  styleUrl: './login-callback.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginCallbackComponent implements OnInit {
  public readonly user$ = new ReplaySubject<UserModel>(1);
  public user: UserModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userStore: UserStore,
    private loginService: LoginService,
    private profileApi: ProfileApi,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap((params) => {
          return this.profileApi
            .getUser(params['profileId'])
            .pipe(
              map((profile) => ({ profile: {
                profileId: profile.id,
                profileName: profile.name,
                profileEmail: profile.email,
                profileImageUrl: profile.imageUrl,
                profileUserId: profile.userId
              }, access_token: params['token'] })),
            );
        }),
      )
      .subscribe({
        next: (auth) => {
          this.userStore.setUser(auth);

          this.router.navigate(['/home']);
        },
        error: () => {
          console.error('Invalid redirect parameters');
          this.router.navigate(['/login']);
        },
      });
  }
}
