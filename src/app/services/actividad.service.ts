import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Actividad } from '../models';

/** Servicio de Actividades. Consume: ActividadController del backend. */
@Injectable({ providedIn: 'root' })
export class ActividadService {
  private baseUrl = `${environment.apiUrl}/actividades`;
  constructor(private http: HttpClient) {}

  getActividades(procesoId: number): Observable<ApiResponse<Actividad[]>> {
    return this.http.get<ApiResponse<Actividad[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  crearActividad(actividad: Actividad): Observable<ApiResponse<Actividad>> {
    return this.http.post<ApiResponse<Actividad>>(this.baseUrl, actividad);
  }

  updateActividad(id: number, actividad: Partial<Actividad>): Observable<ApiResponse<Actividad>> {
    return this.http.put<ApiResponse<Actividad>>(`${this.baseUrl}/${id}`, actividad);
  }

  deleteActividad(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
