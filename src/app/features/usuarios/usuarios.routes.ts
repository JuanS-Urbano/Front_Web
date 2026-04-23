import { Routes } from '@angular/router';

export const USUARIOS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./usuarios-list/usuarios-list').then(m => m.UsuariosList) },
  { path: 'crear', loadComponent: () => import('./usuario-form/usuario-form').then(m => m.UsuarioForm) },
  { path: 'editar/:id', loadComponent: () => import('./usuario-form/usuario-form').then(m => m.UsuarioForm) }
];
