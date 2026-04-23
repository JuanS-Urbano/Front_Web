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

  // POST /api/v1/empresas → ApiResponse<EmpresaDTO>
  crearEmpresa(empresa: EmpresaModel): Observable<ApiResponse<EmpresaModel>> {
    return this.http.post<ApiResponse<EmpresaModel>>(this.baseUrl, empresa);
  }

  // GET /api/v1/empresas → ApiResponse<List<EmpresaDTO>>
  listarEmpresas(): Observable<ApiResponse<EmpresaModel[]>> {
    return this.http.get<ApiResponse<EmpresaModel[]>>(this.baseUrl);
  }
}
