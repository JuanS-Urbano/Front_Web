import { Routes } from '@angular/router';

export const PROCESOS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./procesos-list/procesos-list.component').then(m => m.ProcesosListComponent) },
  { path: 'crear', loadComponent: () => import('./proceso-form/proceso-form.component').then(m => m.ProcesoFormComponent) },
  { path: ':id', loadComponent: () => import('./proceso-detail/proceso-detail.component').then(m => m.ProcesoDetailComponent) },
  { path: 'editar/:id', loadComponent: () => import('./proceso-form/proceso-form.component').then(m => m.ProcesoFormComponent) }
];
