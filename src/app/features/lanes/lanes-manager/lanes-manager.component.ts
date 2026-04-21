import { Component, OnInit } from '@angular/core';

/**
 * Componente: LanesManagerComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-lanes-manager',
  standalone: true,
  imports: [],
  templateUrl: './lanes-manager.component.html',
  styleUrl: './lanes-manager.component.css'
})
export class LanesManagerComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
