import { Routes } from '@angular/router';
import { authenticationGuard } from './core/guard/authentication.guard';
import { unauthenticationGuard } from './core/guard/un-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing-page',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.routes').then((r) => r.loginRoutes),
    canActivate: [unauthenticationGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then((r) => r.homeRoutes),
    canActivate: [authenticationGuard],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin-page/admin.routes').then(
        (r) => r.adminPageRoutes,
      ),
      canActivate: [unauthenticationGuard],
  },
  {
    path: 'landing-page',
    loadChildren: () =>
      import('./features/landing-page/landing-page.routes').then(
        (r) => r.landingPageRoutes,
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./features/setting/setting.routes').then((r) => r.settingRoutes),
    canActivate: [authenticationGuard],
  }
];
