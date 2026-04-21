import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse, Pool } from '../models';

/** Servicio de Pool. Consume: PoolController del backend. */
@Injectable({ providedIn: 'root' })
export class PoolService {
  private baseUrl = `${environment.apiUrl}/pools`;
  constructor(private http: HttpClient) {}

  getPool(empresaId: number): Observable<ApiResponse<Pool>> {
    return this.http.get<ApiResponse<Pool>>(`${this.baseUrl}?empresaId=${empresaId}`);
  }

  updatePool(id: number, pool: Partial<Pool>): Observable<ApiResponse<Pool>> {
    return this.http.put<ApiResponse<Pool>>(`${this.baseUrl}/${id}`, pool);
  }
}
