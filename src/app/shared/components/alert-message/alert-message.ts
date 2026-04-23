import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-message',
  imports: [],
  templateUrl: './alert-message.html',
  styleUrl: './alert-message.css',
})
export class AlertMessage {
  @Input() tipo: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() mensaje = '';
}
