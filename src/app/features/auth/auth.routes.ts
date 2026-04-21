import { Routes } from '@angular/router';

/** Rutas del módulo de autenticación (públicas, sin AuthGuard). */
export const AUTH_ROUTES: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'registro', loadComponent: () => import('./registro-empresa/registro-empresa.component').then(m => m.RegistroEmpresaComponent) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
