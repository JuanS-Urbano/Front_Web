import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Actividad as ActividadModel } from '../models/actividad';

@Injectable({
  providedIn: 'root',
})
export class Actividad {

  private baseUrl = `${environment.apiUrl}/actividades`;

  constructor(private http: HttpClient) {}

  getActividades(procesoId: number): Observable<ApiResponse<ActividadModel[]>> {
    return this.http.get<ApiResponse<ActividadModel[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  crearActividad(actividad: ActividadModel): Observable<ApiResponse<ActividadModel>> {
    return this.http.post<ApiResponse<ActividadModel>>(this.baseUrl, actividad);
  }

  updateActividad(id: number, actividad: Partial<ActividadModel>): Observable<ApiResponse<ActividadModel>> {
    return this.http.put<ApiResponse<ActividadModel>>(`${this.baseUrl}/${id}`, actividad);
  }

  deleteActividad(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
