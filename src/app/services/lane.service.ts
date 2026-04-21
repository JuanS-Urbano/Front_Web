import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Lane } from '../models';

/** Servicio de Lanes. Consume: LaneController del backend. */
@Injectable({ providedIn: 'root' })
export class LaneService {
  private baseUrl = `${environment.apiUrl}/lanes`;
  constructor(private http: HttpClient) {}

  getLanes(procesoId: number): Observable<ApiResponse<Lane[]>> {
    return this.http.get<ApiResponse<Lane[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  crearLane(lane: Lane): Observable<ApiResponse<Lane>> {
    return this.http.post<ApiResponse<Lane>>(this.baseUrl, lane);
  }

  updateLane(id: number, lane: Partial<Lane>): Observable<ApiResponse<Lane>> {
    return this.http.put<ApiResponse<Lane>>(`${this.baseUrl}/${id}`, lane);
  }

  deleteLane(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
