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
        path: 'songs/:artistId',
        loadComponent: () => import('./features/themes/theme-board/theme-board').then(c => c.ThemeBoard)
    }, {
        path: 'songs',
        redirectTo: 'songs/27',
        pathMatch: 'full'
    },
    {
        path: 'change-song',
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
