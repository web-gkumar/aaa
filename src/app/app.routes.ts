import { Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
      
      { path: '', component: TabsPage, children: [
          { path: 'login', loadComponent: () => import('./pages/auth/login/login.page').then(m => m.LoginPage)},
          { path: 'register', loadComponent: () => import('./pages/auth/signup/signup.page').then(m => m.SignupPage)},
          { path: 'forget-password', loadComponent: () => import('./pages/auth/forget-password/forget-password.page').then(m => m.ForgetPasswordPage) },
          { path: 'home', loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage) },
          { path: 'profile', canActivate: [authGuard], loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage) },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
      },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
