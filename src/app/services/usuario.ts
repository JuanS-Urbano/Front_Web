import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Usuario as UsuarioModel } from '../models/usuario';
import { UsuarioCreate } from '../models/usuario-create';

@Injectable({
  providedIn: 'root',
})
export class Usuario {

  private baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getUsuarios(empresaId: number): Observable<ApiResponse<UsuarioModel[]>> {
    return this.http.get<ApiResponse<UsuarioModel[]>>(`${this.baseUrl}?empresaId=${empresaId}`);
  }

  crearUsuario(usuario: UsuarioCreate): Observable<ApiResponse<UsuarioModel>> {
    return this.http.post<ApiResponse<UsuarioModel>>(this.baseUrl, usuario);
  }

  updateUsuario(id: number, usuario: Partial<UsuarioModel>): Observable<ApiResponse<UsuarioModel>> {
    return this.http.put<ApiResponse<UsuarioModel>>(`${this.baseUrl}/${id}`, usuario);
  }

  deleteUsuario(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
