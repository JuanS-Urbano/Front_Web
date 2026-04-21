import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, NotificacionRequest, NotificacionResponse } from '../models';

/** Servicio de Notificaciones. Consume: NotificacionController del backend. */
@Injectable({ providedIn: 'root' })
export class NotificacionService {
  private baseUrl = `${environment.apiUrl}/notificaciones`;
  constructor(private http: HttpClient) {}

  enviarNotificacion(request: NotificacionRequest): Observable<ApiResponse<NotificacionResponse>> {
    return this.http.post<ApiResponse<NotificacionResponse>>(this.baseUrl, request);
  }

  getNotificaciones(): Observable<ApiResponse<NotificacionResponse[]>> {
    return this.http.get<ApiResponse<NotificacionResponse[]>>(this.baseUrl);
  }
}
