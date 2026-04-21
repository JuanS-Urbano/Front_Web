import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, AuthRequest, AuthResponse, Empresa } from '../models';

/**
 * Servicio de autenticación.
 * Consume: AuthController del backend.
 *
 * Patrón: el servicio concentra la lógica HTTP,
 * retorna Observable, y el componente se suscribe.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  /**
   * Iniciar sesión con email y password.
   * TODO: implementar el endpoint correcto del backend
   */
  login(request: AuthRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, request);
  }

  /**
   * Registrar una nueva empresa (y su usuario administrador inicial).
   * TODO: implementar el endpoint correcto del backend
   */
  registrarEmpresa(empresa: Empresa): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(`${this.baseUrl}/registro`, empresa);
  }
}
