import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserStore } from '../stores/user.store';
import { map, switchMap } from 'rxjs';

export const unauthenticationGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return userStore.getUser.pipe(
    map((authModel) => {
      if (!authModel?.access_token) {
        return true;
      } else {
        return router.createUrlTree(['/home']);
      }
    }),
  );
};
