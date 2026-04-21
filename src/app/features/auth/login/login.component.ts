import { Component } from '@angular/core';

/**
 * Componente: Login.
 * Formulario de inicio de sesión.
 * Usa AuthService para autenticar y SessionService para guardar la sesión.
 *
 * Patrón: Componente se suscribe al Observable del servicio para obtener respuesta.
 */
@Component({ selector: 'app-login', standalone: true, imports: [], templateUrl: './login.component.html', styleUrl: './login.component.css' })
export class LoginComponent {
  // TODO: Implementar formulario reactivo (email + password)
  // TODO: Inyectar AuthService y SessionService
  // TODO: Al hacer login exitoso, navegar a /dashboard
}
