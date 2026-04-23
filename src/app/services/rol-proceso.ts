import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { RolProceso as RolProcesoModel } from '../models/rol-proceso';

@Injectable({
  providedIn: 'root',
})
export class RolProceso {

  private baseUrl = `${environment.apiUrl}/roles-proceso`;
  constructor(private http: HttpClient) {}
  getRoles(empresaId: number): Observable<ApiResponse<RolProcesoModel[]>> { return this.http.get<ApiResponse<RolProcesoModel[]>>(`${this.baseUrl}?empresaId=${empresaId}`); }
  crearRol(rol: RolProcesoModel): Observable<ApiResponse<RolProcesoModel>> { return this.http.post<ApiResponse<RolProcesoModel>>(this.baseUrl, rol); }
  updateRol(id: number, rol: Partial<RolProcesoModel>): Observable<ApiResponse<RolProcesoModel>> { return this.http.put<ApiResponse<RolProcesoModel>>(`${this.baseUrl}/${id}`, rol); }
  deleteRol(id: number): Observable<ApiResponse<void>> { return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`); }
}
