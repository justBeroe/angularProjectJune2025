import { Routes } from '@angular/router';
import { NotFound } from './shared/components/not-found/not-found';
import { ThemeContent } from './features/themes/theme-content/theme-content';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(c => c.Home)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(c => c.Register)
    },
    {
        path: 'themes/:artistId',
        loadComponent: () => import('./features/themes/theme-board/theme-board').then(c => c.ThemeBoard)
    }, {
        path: 'themes',
        redirectTo: 'themes/27',
        pathMatch: 'full'
    },
    {
        path: 'add-theme',
        loadComponent: () => import('./features/themes/new-theme/new-theme').then(c => c.NewTheme)
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile').then(c => c.Profile)
    },
    {
        path: '**',
        component: NotFound
    }


];
