import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast-notification',
  imports: [],
  templateUrl: './toast-notification.html',
  styleUrl: './toast-notification.css',
})
export class ToastNotification {
  @Input() tipo: 'success' | 'error' | 'info' = 'info';
  @Input() mensaje = '';
  @Input() visible = false;
}
