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
  getMensajes(procesoId: number): Observable<ApiResponse<MensajeModel[]>> { return this.http.get<ApiResponse<MensajeModel[]>>(`${this.baseUrl}?procesoId=${procesoId}`); }
  enviarMensaje(mensaje: MensajeModel): Observable<ApiResponse<CorrelacionResult>> { return this.http.post<ApiResponse<CorrelacionResult>>(`${this.baseUrl}/throw`, mensaje); }
  recibirMensaje(mensajeId: number): Observable<ApiResponse<MensajeModel>> { return this.http.get<ApiResponse<MensajeModel>>(`${this.baseUrl}/catch/${mensajeId}`); }
}
