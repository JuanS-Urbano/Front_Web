import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Pool as PoolModel } from '../models/pool';

@Injectable({
  providedIn: 'root',
})
export class Pool {

  private baseUrl = `${environment.apiUrl}/pools`;

  constructor(private http: HttpClient) {}

  getPool(empresaId: number): Observable<ApiResponse<PoolModel>> {
    return this.http.get<ApiResponse<PoolModel>>(`${this.baseUrl}?empresaId=${empresaId}`);
  }

  updatePool(id: number, pool: Partial<PoolModel>): Observable<ApiResponse<PoolModel>> {
    return this.http.put<ApiResponse<PoolModel>>(`${this.baseUrl}/${id}`, pool);
  }
}
