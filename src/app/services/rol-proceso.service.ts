import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, RolProceso } from '../models';

/** Servicio de Roles de Proceso. Consume: RolProcesoController del backend. */
@Injectable({ providedIn: 'root' })
export class RolProcesoService {
  private baseUrl = `${environment.apiUrl}/roles-proceso`;
  constructor(private http: HttpClient) {}

  getRoles(empresaId: number): Observable<ApiResponse<RolProceso[]>> {
    return this.http.get<ApiResponse<RolProceso[]>>(`${this.baseUrl}?empresaId=${empresaId}`);
  }

  crearRol(rol: RolProceso): Observable<ApiResponse<RolProceso>> {
    return this.http.post<ApiResponse<RolProceso>>(this.baseUrl, rol);
  }

  updateRol(id: number, rol: Partial<RolProceso>): Observable<ApiResponse<RolProceso>> {
    return this.http.put<ApiResponse<RolProceso>>(`${this.baseUrl}/${id}`, rol);
  }

  deleteRol(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
