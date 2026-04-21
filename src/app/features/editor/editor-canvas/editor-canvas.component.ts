import { Component, OnInit } from '@angular/core';

/**
 * Componente: EditorCanvasComponent.
 * TODO: Implementar logica de negocio y UI.
 */
@Component({
  selector: 'app-editor-canvas',
  standalone: true,
  imports: [],
  templateUrl: './editor-canvas.component.html',
  styleUrl: './editor-canvas.component.css'
})
export class EditorCanvasComponent implements OnInit {

  /** Se ejecuta al inicializar. Cargar datos con suscripcion al servicio. */
  ngOnInit(): void {
    // TODO: suscribirse al Observable del servicio correspondiente
  }
}
