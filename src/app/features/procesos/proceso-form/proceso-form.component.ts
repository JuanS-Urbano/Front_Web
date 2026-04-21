import { Component, OnInit } from '@angular/core';

/**
 * Componente: ProcesoFormComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-proceso-form',
  standalone: true,
  imports: [],
  templateUrl: './proceso-form.component.html',
  styleUrl: './proceso-form.component.css'
})
export class ProcesoFormComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
