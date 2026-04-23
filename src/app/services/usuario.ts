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

  // POST /api/v1/usuarios → ApiResponse<UsuarioDTO>
  crearUsuario(usuario: UsuarioCreate): Observable<ApiResponse<UsuarioModel>> {
    return this.http.post<ApiResponse<UsuarioModel>>(this.baseUrl, usuario);
  }

  // GET /api/v1/usuarios/empresa/{empresaId} → ApiResponse<List<UsuarioDTO>>
  getUsuariosPorEmpresa(empresaId: number): Observable<ApiResponse<UsuarioModel[]>> {
    return this.http.get<ApiResponse<UsuarioModel[]>>(`${this.baseUrl}/empresa/${empresaId}`);
  }

  // PUT /api/v1/usuarios/{id}/rol?nuevoRol=EDITOR → ApiResponse<UsuarioDTO>
  cambiarRol(id: number, nuevoRol: string): Observable<ApiResponse<UsuarioModel>> {
    return this.http.put<ApiResponse<UsuarioModel>>(`${this.baseUrl}/${id}/rol?nuevoRol=${nuevoRol}`, {});
  }
}
