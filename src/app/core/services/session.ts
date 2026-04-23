import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class Session {

  private readonly STORAGE_KEY = 'session';
  private sessionSubject: BehaviorSubject<AuthResponse | null>;

  /** Observable público: los componentes se suscriben para reaccionar a cambios de sesión */
  session$: Observable<AuthResponse | null>;

  constructor() {
    const saved = this.loadFromStorage();
    this.sessionSubject = new BehaviorSubject<AuthResponse | null>(saved);
    this.session$ = this.sessionSubject.asObservable();
  }

  /** Guarda la sesión tras login exitoso (memoria + localStorage) */
  login(authResponse: AuthResponse): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authResponse));
    this.sessionSubject.next(authResponse);
  }

  /** Cierra sesión (limpia memoria + localStorage) */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.sessionSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.sessionSubject.value !== null;
  }

  getUserEmail(): string | null {
    return this.sessionSubject.value?.email ?? null;
  }

  getUserRole(): string | null {
    return this.sessionSubject.value?.rolSistema ?? null;
  }

  getEmpresaId(): number | null {
    return this.sessionSubject.value?.empresa?.id ?? null;
  }

  getEmpresaNombre(): string | null {
    return this.sessionSubject.value?.empresa?.nombre ?? null;
  }

  getSession(): AuthResponse | null {
    return this.sessionSubject.value;
  }

  /** Recupera sesión de localStorage al iniciar la app */
  private loadFromStorage(): AuthResponse | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
