import { Component, Input } from '@angular/core';

/** Componente reutilizable: Toast/notificación global. */
@Component({ selector: 'app-toast-notification', standalone: true, imports: [], templateUrl: './toast-notification.component.html', styleUrl: './toast-notification.component.css' })
export class ToastNotificationComponent {
  @Input() tipo: 'success' | 'error' | 'info' = 'info';
  @Input() mensaje = '';
  @Input() visible = false;
}
