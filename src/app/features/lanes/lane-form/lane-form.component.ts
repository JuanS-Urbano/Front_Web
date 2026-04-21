import { Component, OnInit } from '@angular/core';

/**
 * Componente: LaneFormComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-lane-form',
  standalone: true,
  imports: [],
  templateUrl: './lane-form.component.html',
  styleUrl: './lane-form.component.css'
})
export class LaneFormComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
