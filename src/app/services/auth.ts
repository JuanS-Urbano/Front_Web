import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { AuthRequest } from '../models/auth-request';
import { AuthResponse } from '../models/auth-response';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(request: AuthRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, request);
  }

  registrarEmpresa(empresa: Empresa): Observable<ApiResponse<Empresa>> {
    return this.http.post<ApiResponse<Empresa>>(`${this.baseUrl}/registro`, empresa);
  }
}
