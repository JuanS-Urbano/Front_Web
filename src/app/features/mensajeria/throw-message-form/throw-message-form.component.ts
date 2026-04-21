import { Component, OnInit } from '@angular/core';

/**
 * Componente: ThrowMessageFormComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-throw-message-form',
  standalone: true,
  imports: [],
  templateUrl: './throw-message-form.component.html',
  styleUrl: './throw-message-form.component.css'
})
export class ThrowMessageFormComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
