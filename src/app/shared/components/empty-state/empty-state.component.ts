import { Component, Input } from '@angular/core';

/** Componente reutilizable: Estado vacío (sin datos). */
@Component({ selector: 'app-empty-state', standalone: true, imports: [], templateUrl: './empty-state.component.html', styleUrl: './empty-state.component.css' })
export class EmptyStateComponent {
  @Input() titulo = 'Sin resultados';
  @Input() descripcion = 'No se encontraron datos para mostrar.';
  @Input() icono = '📭';
}
