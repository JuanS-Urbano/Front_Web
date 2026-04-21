import { Component, OnInit } from '@angular/core';

/**
 * Componente: RolesListComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.css'
})
export class RolesListComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
