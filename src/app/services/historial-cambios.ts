import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { HistorialCambios } from '../models/historial-cambios';

@Injectable({
  providedIn: 'root',
})
export class HistorialCambiosService {
  private baseUrl = `${environment.apiUrl}/historial-cambios`;

  constructor(private http: HttpClient) {}

  getHistorialByProceso(procesoId: number): Observable<ApiResponse<HistorialCambios[]>> {
    return this.http.get<ApiResponse<HistorialCambios[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }
}
