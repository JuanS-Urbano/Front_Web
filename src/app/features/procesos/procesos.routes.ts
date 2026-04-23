import { Routes } from '@angular/router';

export const PROCESOS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./procesos-list/procesos-list').then(m => m.ProcesosList) },
  { path: 'crear', loadComponent: () => import('./proceso-form/proceso-form').then(m => m.ProcesoForm) },
  { path: ':id', loadComponent: () => import('./proceso-detail/proceso-detail').then(m => m.ProcesoDetail) },
  { path: 'editar/:id', loadComponent: () => import('./proceso-form/proceso-form').then(m => m.ProcesoForm) }
];
