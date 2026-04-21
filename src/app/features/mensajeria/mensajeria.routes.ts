import { Routes } from '@angular/router';

export const MENSAJERIA_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./mensajes-list/mensajes-list.component').then(m => m.MensajesListComponent) },
  { path: 'throw', loadComponent: () => import('./throw-message-form/throw-message-form.component').then(m => m.ThrowMessageFormComponent) },
  { path: 'catch', loadComponent: () => import('./catch-message-config/catch-message-config.component').then(m => m.CatchMessageConfigComponent) },
  { path: 'notificaciones', loadComponent: () => import('./notificaciones/notificaciones.component').then(m => m.NotificacionesComponent) }
];
