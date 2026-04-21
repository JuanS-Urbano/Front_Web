import { Component, OnInit } from '@angular/core';

/**
 * Componente: UsuariosListComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css'
})
export class UsuariosListComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
