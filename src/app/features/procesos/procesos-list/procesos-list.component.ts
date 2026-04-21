import { Component, OnInit } from '@angular/core';

/**
 * Componente: ProcesosListComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-procesos-list',
  standalone: true,
  imports: [],
  templateUrl: './procesos-list.component.html',
  styleUrl: './procesos-list.component.css'
})
export class ProcesosListComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
