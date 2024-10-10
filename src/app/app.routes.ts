import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './dashboard/settings/settings.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {
        title: 'Home',
        path: 'home',
        component: HomeComponent
    },
    {
        title: 'Login',
        path: 'login',
        component: LoginComponent
    },
    {
        title: 'Dashboard',
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                title: 'Settings',
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: '',
                redirectTo: 'settings',
                pathMatch: 'full'
            }
        ]
    },
    {
        title: 'Add Product',
        path: 'add-product',
        component: AddProductComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
