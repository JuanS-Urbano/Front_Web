import { Routes } from '@angular/router';

export const LANES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./lanes-manager/lanes-manager').then(m => m.LanesManager) },
  { path: 'crear', loadComponent: () => import('./lane-form/lane-form').then(m => m.LaneForm) },
  { path: 'editar/:id', loadComponent: () => import('./lane-form/lane-form').then(m => m.LaneForm) }
];
