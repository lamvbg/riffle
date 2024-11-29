import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MessagePageComponent } from 'src/app/shared/components/message-page/message-page.component';
import { LiveScreenPageComponent } from 'src/app/shared/components/live-screen-page/live-screen-page.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
          path: '',
          pathMatch: 'full',
          redirectTo: 'message',
      },
      {
          path: 'message',
          component: MessagePageComponent
      },
      {
          path: 'live-screen',
          component: LiveScreenPageComponent
      }
  ]
  },
];

