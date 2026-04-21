import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../models';

/**
 * Servicio de sesión global.
 *
 * Usa BehaviorSubject para mantener el estado de autenticación.
 * Los componentes se suscriben al observable para reaccionar a cambios de sesión.
 *
 * Patrón: Servicio → Observable (BehaviorSubject) → Componente se suscribe
 */
@Injectable({ providedIn: 'root' })
export class SessionService {

  /** Estado interno de la sesión (BehaviorSubject emite el último valor a nuevos suscriptores) */
  private sessionSubject = new BehaviorSubject<AuthResponse | null>(null);

  /** Observable público al que los componentes se suscriben */
  session$: Observable<AuthResponse | null> = this.sessionSubject.asObservable();

  /**
   * Guarda la sesión del usuario tras un login exitoso.
   * TODO: Implementar persistencia en localStorage/sessionStorage
   */
  login(authResponse: AuthResponse): void {
    // TODO: guardar en localStorage para persistir entre recargas
    this.sessionSubject.next(authResponse);
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout(): void {
    // TODO: limpiar localStorage
    this.sessionSubject.next(null);
  }

  /**
   * Verifica si hay una sesión activa.
   */
  isLoggedIn(): boolean {
    return this.sessionSubject.value !== null;
  }

  /**
   * Obtiene el email del usuario actual (para el interceptor).
   */
  getUserEmail(): string | null {
    return this.sessionSubject.value?.email ?? null;
  }

  /**
   * Obtiene el rol del usuario actual.
   */
  getUserRole(): string | null {
    return this.sessionSubject.value?.rol ?? null;
  }

  /**
   * Obtiene el ID de la empresa activa.
   */
  getEmpresaId(): number | null {
    return this.sessionSubject.value?.empresaId ?? null;
  }

  /**
   * Obtiene la sesión actual de forma síncrona.
   */
  getSession(): AuthResponse | null {
    return this.sessionSubject.value;
  }
}
