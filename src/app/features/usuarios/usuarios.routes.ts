import { Routes } from '@angular/router';

export const USUARIOS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./usuarios-list/usuarios-list.component').then(m => m.UsuariosListComponent) },
  { path: 'crear', loadComponent: () => import('./usuario-form/usuario-form.component').then(m => m.UsuarioFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./usuario-form/usuario-form.component').then(m => m.UsuarioFormComponent) }
];
