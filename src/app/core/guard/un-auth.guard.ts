import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserStore } from '../stores/user.store';
import { map, switchMap } from 'rxjs';
import { SocketService } from 'src/app/shared/components/message-page/services/socket.service';

export const unauthenticationGuard: CanActivateFn = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);
  const socketService = inject(SocketService);

  return userStore.getUser.pipe(
    map((authModel) => {
      if (!authModel?.access_token) {
        socketService.disconnect();
        return true;
      } else {
        return router.createUrlTree(['/home']);
      }
    }),
  );
};
