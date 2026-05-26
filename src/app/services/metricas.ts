import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Metricas as MetricasModel } from '../models/metricas';

@Injectable({
  providedIn: 'root',
})
export class Metricas {

  private baseUrl = `${environment.apiUrl}/metricas`;

  constructor(private http: HttpClient) {}

  getMetricasPorEmpresa(empresaId: number): Observable<ApiResponse<MetricasModel>> {
    return this.http.get<ApiResponse<MetricasModel>>(`${this.baseUrl}/empresa/${empresaId}`);
  }
}
