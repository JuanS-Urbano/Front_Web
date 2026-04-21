import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./roles-list/roles-list.component').then(m => m.RolesListComponent) },
  { path: 'crear', loadComponent: () => import('./rol-form/rol-form.component').then(m => m.RolFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./rol-form/rol-form.component').then(m => m.RolFormComponent) }
];
