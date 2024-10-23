import { Routes } from '@angular/router';

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
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.routes').then((r) => r.homeRoutes),
  },
  {
    path: 'landing-page',
    loadChildren: () =>
      import('./features/landing-page/landing-page.routes').then(
        (r) => r.landingPageRoutes,
      ),
  },
];
