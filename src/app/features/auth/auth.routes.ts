import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./registro-empresa/registro-empresa').then(m => m.RegistroEmpresa) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
