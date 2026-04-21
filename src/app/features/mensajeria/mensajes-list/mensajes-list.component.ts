import { Component, OnInit } from '@angular/core';

/**
 * Componente: MensajesListComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-mensajes-list',
  standalone: true,
  imports: [],
  templateUrl: './mensajes-list.component.html',
  styleUrl: './mensajes-list.component.css'
})
export class MensajesListComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
