import { Component, OnInit } from '@angular/core';

/**
 * Componente: RolesSelectComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-roles-select',
  standalone: true,
  imports: [],
  templateUrl: './roles-select.component.html',
  styleUrl: './roles-select.component.css'
})
export class RolesSelectComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
