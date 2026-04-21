import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Gateway } from '../models';

/** Servicio de Gateways. Consume: GatewayController del backend. */
@Injectable({ providedIn: 'root' })
export class GatewayService {
  private baseUrl = `${environment.apiUrl}/gateways`;
  constructor(private http: HttpClient) {}

  getGateways(procesoId: number): Observable<ApiResponse<Gateway[]>> {
    return this.http.get<ApiResponse<Gateway[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  crearGateway(gateway: Gateway): Observable<ApiResponse<Gateway>> {
    return this.http.post<ApiResponse<Gateway>>(this.baseUrl, gateway);
  }

  updateGateway(id: number, gateway: Partial<Gateway>): Observable<ApiResponse<Gateway>> {
    return this.http.put<ApiResponse<Gateway>>(`${this.baseUrl}/${id}`, gateway);
  }

  deleteGateway(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
