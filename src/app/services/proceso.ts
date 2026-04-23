import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Proceso as ProcesoModel } from '../models/proceso';

@Injectable({
  providedIn: 'root',
})
export class Proceso {

  private baseUrl = `${environment.apiUrl}/procesos`;

  constructor(private http: HttpClient) {}

  getProcesos(poolId: number): Observable<ApiResponse<ProcesoModel[]>> {
    return this.http.get<ApiResponse<ProcesoModel[]>>(`${this.baseUrl}?poolId=${poolId}`);
  }

  getProcesoById(id: number): Observable<ApiResponse<ProcesoModel>> {
    return this.http.get<ApiResponse<ProcesoModel>>(`${this.baseUrl}/${id}`);
  }

  crearProceso(proceso: ProcesoModel): Observable<ApiResponse<ProcesoModel>> {
    return this.http.post<ApiResponse<ProcesoModel>>(this.baseUrl, proceso);
  }

  updateProceso(id: number, proceso: Partial<ProcesoModel>): Observable<ApiResponse<ProcesoModel>> {
    return this.http.put<ApiResponse<ProcesoModel>>(`${this.baseUrl}/${id}`, proceso);
  }

  deleteProceso(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
