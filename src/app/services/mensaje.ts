import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Mensaje as MensajeModel } from '../models/mensaje';
import { CorrelacionResult } from '../models/correlacion-result';

@Injectable({
  providedIn: 'root',
})
export class Mensaje {

  private baseUrl = `${environment.apiUrl}/mensajes`;

  constructor(private http: HttpClient) {}

  getMensajes(procesoId: number): Observable<ApiResponse<MensajeModel[]>> {
    return this.http.get<ApiResponse<MensajeModel[]>>(`${this.baseUrl}/proceso/${procesoId}`);
  }

  enviarMensaje(mensaje: MensajeModel): Observable<ApiResponse<CorrelacionResult>> {
    return this.http.post<ApiResponse<CorrelacionResult>>(`${this.baseUrl}/throw`, mensaje);
  }

  recibirMensaje(mensajeId: number): Observable<ApiResponse<MensajeModel>> {
    return this.http.get<ApiResponse<MensajeModel>>(`${this.baseUrl}/${mensajeId}`);
  }

  correlacionar(correlationKey: string): Observable<ApiResponse<CorrelacionResult>> {
    return this.http.post<ApiResponse<CorrelacionResult>>(`${this.baseUrl}/correlate/${correlationKey}`, {});
  }

  getMensajesPorCorrelacion(correlationKey: string): Observable<ApiResponse<MensajeModel[]>> {
    return this.http.get<ApiResponse<MensajeModel[]>>(`${this.baseUrl}/correlation/${correlationKey}`);
  }

  crearMensajeCatch(mensaje: MensajeModel): Observable<ApiResponse<MensajeModel>> {
    return this.http.post<ApiResponse<MensajeModel>>(`${this.baseUrl}/catch`, mensaje);
  }
}
