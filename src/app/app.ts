import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente principal (raíz) de la aplicación.
 *
 * Sigue el patrón: AppComponent (principal) → Componentes hijos
 * El RouterOutlet carga dinámicamente la vista central según la ruta activa.
 *
 * Estructura visual:
 * ┌─────────────────────────────────┐
 * │        AppComponent             │
 * │  ┌───────────────────────────┐  │
 * │  │      <router-outlet>      │  │
 * │  │   (Vista central dinámica)│  │
 * │  └───────────────────────────┘  │
 * └─────────────────────────────────┘
 *
 * Nota: Header/Sidebar/Footer se manejan dentro del AppLayoutComponent
 * que se carga como hijo a través del router para las rutas autenticadas.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // El componente raíz solo sirve como contenedor del router-outlet.
  // La lógica de negocio se delega a los componentes hijos.
}
