import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Proceso } from '../models';

/**
 * Servicio de Procesos.
 * Consume: ProcesoController del backend.
 */
@Injectable({ providedIn: 'root' })
export class ProcesoService {

  private baseUrl = `${environment.apiUrl}/procesos`;

  constructor(private http: HttpClient) {}

  getProcesos(poolId: number): Observable<ApiResponse<Proceso[]>> {
    return this.http.get<ApiResponse<Proceso[]>>(`${this.baseUrl}?poolId=${poolId}`);
  }

  getProcesoById(id: number): Observable<ApiResponse<Proceso>> {
    return this.http.get<ApiResponse<Proceso>>(`${this.baseUrl}/${id}`);
  }

  crearProceso(proceso: Proceso): Observable<ApiResponse<Proceso>> {
    return this.http.post<ApiResponse<Proceso>>(this.baseUrl, proceso);
  }

  updateProceso(id: number, proceso: Partial<Proceso>): Observable<ApiResponse<Proceso>> {
    return this.http.put<ApiResponse<Proceso>>(`${this.baseUrl}/${id}`, proceso);
  }

  deleteProceso(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  // TODO: agregar búsqueda, filtros por estado/categoría
}
