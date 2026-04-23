import { Routes } from '@angular/router';

export const HISTORIAL_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./historial').then(m => m.Historial) },
  { path: 'pool', loadComponent: () => import('./pool-config/pool-config').then(m => m.PoolConfig) }
];
