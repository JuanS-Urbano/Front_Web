import { Component, OnInit } from '@angular/core';

/**
 * Componente: HistorialComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
