import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Lane as LaneModel } from '../models/lane';

@Injectable({
  providedIn: 'root',
})
export class Lane {

  private baseUrl = `${environment.apiUrl}`;
  constructor(private http: HttpClient) {}
  getLanes(procesoId: number): Observable<ApiResponse<LaneModel[]>> { return this.http.get<ApiResponse<LaneModel[]>>(`${this.baseUrl}/procesos/${procesoId}/lanes`); }
  crearLane(lane: LaneModel): Observable<ApiResponse<LaneModel>> { return this.http.post<ApiResponse<LaneModel>>(`${this.baseUrl}/procesos/${lane.procesoId}/lanes`, lane); }
  updateLane(id: number, lane: Partial<LaneModel>): Observable<ApiResponse<LaneModel>> { return this.http.put<ApiResponse<LaneModel>>(`${this.baseUrl}/lanes/${id}`, lane); }
  deleteLane(id: number): Observable<ApiResponse<void>> { return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/lanes/${id}?confirmar=true`); }
}
