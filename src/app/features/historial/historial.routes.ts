import { Routes } from '@angular/router';

export const HISTORIAL_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./historial/historial.component').then(m => m.HistorialComponent) },
  { path: 'pool', loadComponent: () => import('./pool-config/pool-config.component').then(m => m.PoolConfigComponent) }
];
