import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * Componente principal del Layout autenticado.
 *
 * Patrón: Componente Principal → Componentes Hijos
 * ┌────────────────────────────────────────────┐
 * │              NavbarComponent (Header)       │
 * ├──────────┬─────────────────────────────────┤
 * │ Sidebar  │       Vista Central             │
 * │Component │     <router-outlet>             │
 * │          │  (contenido dinámico por ruta)   │
 * ├──────────┴─────────────────────────────────┤
 * │                Footer                       │
 * └────────────────────────────────────────────┘
 *
 * Los componentes hijos (Navbar, Sidebar) se comunican con el padre
 * usando @Input/@Output cuando sea necesario.
 */
@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {
  // TODO: Manejar estado del sidebar (abierto/cerrado)
  sidebarOpen = true;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
