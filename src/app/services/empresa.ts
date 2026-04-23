import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Empresa as EmpresaModel } from '../models/empresa';

@Injectable({
  providedIn: 'root',
})
export class Empresa {

  private baseUrl = `${environment.apiUrl}/empresas`;

  constructor(private http: HttpClient) {}

  getEmpresa(id: number): Observable<ApiResponse<EmpresaModel>> {
    return this.http.get<ApiResponse<EmpresaModel>>(`${this.baseUrl}/${id}`);
  }

  updateEmpresa(id: number, empresa: EmpresaModel): Observable<ApiResponse<EmpresaModel>> {
    return this.http.put<ApiResponse<EmpresaModel>>(`${this.baseUrl}/${id}`, empresa);
  }
}
