import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Gateway as GatewayModel } from '../models/gateway';

@Injectable({
  providedIn: 'root',
})
export class Gateway {

  private baseUrl = `${environment.apiUrl}/gateways`;
  constructor(private http: HttpClient) {}
  getGateways(procesoId: number): Observable<ApiResponse<GatewayModel[]>> { return this.http.get<ApiResponse<GatewayModel[]>>(`${this.baseUrl}?procesoId=${procesoId}`); }
  crearGateway(gateway: GatewayModel): Observable<ApiResponse<GatewayModel>> { return this.http.post<ApiResponse<GatewayModel>>(this.baseUrl, gateway); }
  updateGateway(id: number, gateway: Partial<GatewayModel>): Observable<ApiResponse<GatewayModel>> { return this.http.put<ApiResponse<GatewayModel>>(`${this.baseUrl}/${id}`, gateway); }
  deleteGateway(id: number): Observable<ApiResponse<void>> { return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`); }
}
