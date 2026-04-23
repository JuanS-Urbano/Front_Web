import { Routes } from '@angular/router';

export const MENSAJERIA_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./mensajes-list/mensajes-list').then(m => m.MensajesList) },
  { path: 'throw', loadComponent: () => import('./throw-message-form/throw-message-form').then(m => m.ThrowMessageForm) },
  { path: 'catch', loadComponent: () => import('./catch-message-config/catch-message-config').then(m => m.CatchMessageConfig) },
  { path: 'notificaciones', loadComponent: () => import('./notificaciones/notificaciones').then(m => m.Notificaciones) }
];
