import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { LoginCallbackComponent } from 'src/app/shared/components/login-callback/login-callback.component';

export const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'callback',
    component: LoginCallbackComponent
  }
];

