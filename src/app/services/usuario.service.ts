import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Usuario, UsuarioCreate } from '../models';

/**
 * Servicio de Usuarios.
 * Consume: UsuarioController del backend.
 */
@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(empresaId: number): Observable<ApiResponse<Usuario[]>> {
    return this.http.get<ApiResponse<Usuario[]>>(`${this.baseUrl}?empresaId=${empresaId}`);
  }

  crearUsuario(usuario: UsuarioCreate): Observable<ApiResponse<Usuario>> {
    return this.http.post<ApiResponse<Usuario>>(this.baseUrl, usuario);
  }

  updateUsuario(id: number, usuario: Partial<Usuario>): Observable<ApiResponse<Usuario>> {
    return this.http.put<ApiResponse<Usuario>>(`${this.baseUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // TODO: agregar métodos adicionales según endpoints del backend
}
