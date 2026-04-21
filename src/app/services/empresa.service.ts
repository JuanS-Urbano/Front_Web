import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Empresa } from '../models';

/**
 * Servicio de Empresa.
 * Consume: EmpresaController del backend.
 */
@Injectable({ providedIn: 'root' })
export class EmpresaService {

  private baseUrl = `${environment.apiUrl}/empresas`;

  constructor(private http: HttpClient) {}

  getEmpresa(id: number): Observable<ApiResponse<Empresa>> {
    return this.http.get<ApiResponse<Empresa>>(`${this.baseUrl}/${id}`);
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<ApiResponse<Empresa>> {
    return this.http.put<ApiResponse<Empresa>>(`${this.baseUrl}/${id}`, empresa);
  }

  // TODO: agregar métodos adicionales según endpoints del backend
}
