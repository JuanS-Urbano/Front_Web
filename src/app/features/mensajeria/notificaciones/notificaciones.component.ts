import { Component, OnInit } from '@angular/core';

/**
 * Componente: NotificacionesComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-notificaciones',
  standalone: true,
  imports: [],
  templateUrl: './notificaciones.component.html',
  styleUrl: './notificaciones.component.css'
})
export class NotificacionesComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
