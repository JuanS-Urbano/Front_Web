import { Component, OnInit } from '@angular/core';

/**
 * Componente: ProcesoDetailComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-proceso-detail',
  standalone: true,
  imports: [],
  templateUrl: './proceso-detail.component.html',
  styleUrl: './proceso-detail.component.css'
})
export class ProcesoDetailComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
