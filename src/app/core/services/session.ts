import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../../models/auth-response';

@Injectable({
  providedIn: 'root',
})
export class Session {

  private sessionSubject = new BehaviorSubject<AuthResponse | null>(null);
  session$: Observable<AuthResponse | null> = this.sessionSubject.asObservable();

  login(authResponse: AuthResponse): void {
    this.sessionSubject.next(authResponse);
  }

  logout(): void {
    this.sessionSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.sessionSubject.value !== null;
  }

  getUserEmail(): string | null {
    return this.sessionSubject.value?.email ?? null;
  }

  getUserRole(): string | null {
    return this.sessionSubject.value?.rol ?? null;
  }

  getEmpresaId(): number | null {
    return this.sessionSubject.value?.empresaId ?? null;
  }

  getSession(): AuthResponse | null {
    return this.sessionSubject.value;
  }
}
