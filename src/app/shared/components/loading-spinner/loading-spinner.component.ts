import { Component, Input } from '@angular/core';

/**
 * Componente reutilizable: Spinner de carga.
 * Muestra un indicador visual mientras se esperan datos del backend.
 */
@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  @Input() mensaje = 'Cargando...';
}
