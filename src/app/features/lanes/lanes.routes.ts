import { Routes } from '@angular/router';

export const LANES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./lanes-manager/lanes-manager.component').then(m => m.LanesManagerComponent) },
  { path: 'crear', loadComponent: () => import('./lane-form/lane-form.component').then(m => m.LaneFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./lane-form/lane-form.component').then(m => m.LaneFormComponent) }
];
