import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class EmptyState {
  @Input() titulo = 'Sin resultados';
  @Input() descripcion = 'No se encontraron datos para mostrar.';
  @Input() icono = '📭';
}
