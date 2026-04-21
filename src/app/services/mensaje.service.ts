import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Mensaje, CorrelacionResult } from '../models';

/** Servicio de Mensajería entre procesos. Consume: MensajeController del backend. */
@Injectable({ providedIn: 'root' })
export class MensajeService {
  private baseUrl = `${environment.apiUrl}/mensajes`;
  constructor(private http: HttpClient) {}

  getMensajes(procesoId: number): Observable<ApiResponse<Mensaje[]>> {
    return this.http.get<ApiResponse<Mensaje[]>>(`${this.baseUrl}?procesoId=${procesoId}`);
  }

  enviarMensaje(mensaje: Mensaje): Observable<ApiResponse<CorrelacionResult>> {
    return this.http.post<ApiResponse<CorrelacionResult>>(`${this.baseUrl}/throw`, mensaje);
  }

  recibirMensaje(mensajeId: number): Observable<ApiResponse<Mensaje>> {
    return this.http.get<ApiResponse<Mensaje>>(`${this.baseUrl}/catch/${mensajeId}`);
  }

  // TODO: agregar endpoints de correlación según el backend
}
