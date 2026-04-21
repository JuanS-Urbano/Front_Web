import { Component, Input } from '@angular/core';

/** Componente reutilizable: Mensaje de alerta (success, error, warning, info). */
@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css'
})
export class AlertMessageComponent {
  @Input() tipo: 'success' | 'error' | 'warning' | 'info' = 'info';
  @Input() mensaje = '';
}
