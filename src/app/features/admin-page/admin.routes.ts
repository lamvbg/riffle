import { Routes } from "@angular/router";
import { AdminPageComponent } from "./admin-page.component";
import { AdminDashboardPageComponent } from "src/app/shared/components/admin-dashboard-page/admin-dashboard-page.component";
import { AdminUserPageComponent } from "src/app/shared/components/admin-user-page/admin-user-page.component";
import { AdminServerPageComponent } from "src/app/shared/components/admin-server-page/admin-server-page.component";
import { AdminChannelPageComponent } from "src/app/shared/components/admin-channel-page/admin-channel-page.component";

export const adminPageRoutes: Routes = [
    {
        path: '',
        component: AdminPageComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'dashboard',
            },
            {
                path: 'dashboard',
                component: AdminDashboardPageComponent
            },
            {
                path: 'users',
                component: AdminUserPageComponent
            },
            {
                path: 'servers',
                component: AdminServerPageComponent
            },
            {
                path: 'channels',
                component: AdminChannelPageComponent
            }
        ]
    }
]