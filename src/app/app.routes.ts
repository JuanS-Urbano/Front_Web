import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

/**
 * Rutas principales de la aplicación (SPA).
 *
 * Estructura:
 * - /auth/**  → Rutas públicas (Login, Registro) — sin AuthGuard
 * - /**       → Rutas protegidas dentro del Layout (con AuthGuard)
 * - **        → 404 Not Found
 *
 * Todas las rutas usan lazy loading para optimizar el bundle inicial.
 */
export const routes: Routes = [
  // Rutas públicas (sin autenticación)
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },

  // Rutas protegidas (con autenticación)
  // El Layout (Header + Sidebar + Vista Central + Footer) envuelve estas rutas
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./features/layout/layout.routes').then(m => m.LAYOUT_ROUTES)
  },

  // 404 - Página no encontrada
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];
