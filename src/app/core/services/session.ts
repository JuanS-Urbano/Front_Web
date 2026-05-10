import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const saved = this.loadFromStorage();
    this.sessionSubject = new BehaviorSubject<AuthResponse | null>(saved);
    this.session$ = this.sessionSubject.asObservable();
  }

  /** Guarda la sesión tras login exitoso (memoria + localStorage) */
  login(authResponse: AuthResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authResponse));
    }
    this.sessionSubject.next(authResponse);
  }

  /** Cierra sesión (limpia memoria + localStorage) */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
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

  getPoolId(): number | null {
    return this.sessionSubject.value?.poolId ?? null;
  }

  getSession(): AuthResponse | null {
    return this.sessionSubject.value;
  }

  /** Recupera sesión de localStorage al iniciar la app (SSR-safe) */
  private loadFromStorage(): AuthResponse | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
