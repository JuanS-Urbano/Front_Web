import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./app-layout/app-layout').then(m => m.AppLayout),
    children: [
      { path: 'dashboard', loadComponent: () => import('../dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'usuarios', loadChildren: () => import('../usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES) },
      { path: 'procesos', loadChildren: () => import('../procesos/procesos.routes').then(m => m.PROCESOS_ROUTES) },
      { path: 'editor/:procesoId', loadChildren: () => import('../editor/editor.routes').then(m => m.EDITOR_ROUTES) },
      { path: 'roles', loadChildren: () => import('../roles/roles.routes').then(m => m.ROLES_ROUTES) },
      { path: 'lanes/:procesoId', loadChildren: () => import('../lanes/lanes.routes').then(m => m.LANES_ROUTES) },
      { path: 'historial', loadChildren: () => import('../historial/historial.routes').then(m => m.HISTORIAL_ROUTES) },
      { path: 'mensajeria', loadChildren: () => import('../mensajeria/mensajeria.routes').then(m => m.MENSAJERIA_ROUTES) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
