import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Arco } from '../models';

/** Servicio de Arcos. Consume: ArcoController del backend. */
@Injectable({ providedIn: 'root' })
export class ArcoService {
  private baseUrl = `${environment.apiUrl}/arcos`;
  constructor(private http: HttpClient) {}

  getArcos(procesoId: number): Observable<ApiResponse<Arco[]>> {
    return this.http.get<ApiResponse<Arco[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  crearArco(arco: Arco): Observable<ApiResponse<Arco>> {
    return this.http.post<ApiResponse<Arco>>(this.baseUrl, arco);
  }

  updateArco(id: number, arco: Partial<Arco>): Observable<ApiResponse<Arco>> {
    return this.http.put<ApiResponse<Arco>>(`${this.baseUrl}/${id}`, arco);
  }

  deleteArco(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
