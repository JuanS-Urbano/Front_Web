import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./roles-list/roles-list').then(m => m.RolesList) },
  { path: 'crear', loadComponent: () => import('./rol-form/rol-form').then(m => m.RolForm) },
  { path: 'editar/:id', loadComponent: () => import('./rol-form/rol-form').then(m => m.RolForm) }
];
