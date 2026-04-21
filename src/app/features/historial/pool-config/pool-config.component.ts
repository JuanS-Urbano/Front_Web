import { Component, OnInit } from '@angular/core';

/**
 * Componente: PoolConfigComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-pool-config',
  standalone: true,
  imports: [],
  templateUrl: './pool-config.component.html',
  styleUrl: './pool-config.component.css'
})
export class PoolConfigComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
