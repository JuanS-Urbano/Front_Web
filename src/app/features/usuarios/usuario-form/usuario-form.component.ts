import { Component, OnInit } from '@angular/core';

/**
 * Componente: UsuarioFormComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
