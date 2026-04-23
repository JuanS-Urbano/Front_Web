import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { ApiResponse } from '../models/api-response';
import { Arco as ArcoModel } from '../models/arco';

@Injectable({
  providedIn: 'root',
})
export class Arco {

  private baseUrl = `${environment.apiUrl}/arcos`;
  constructor(private http: HttpClient) {}
  getArcos(procesoId: number): Observable<ApiResponse<ArcoModel[]>> { return this.http.get<ApiResponse<ArcoModel[]>>(`${this.baseUrl}?procesoId=${procesoId}`); }
  crearArco(arco: ArcoModel): Observable<ApiResponse<ArcoModel>> { return this.http.post<ApiResponse<ArcoModel>>(this.baseUrl, arco); }
  updateArco(id: number, arco: Partial<ArcoModel>): Observable<ApiResponse<ArcoModel>> { return this.http.put<ApiResponse<ArcoModel>>(`${this.baseUrl}/${id}`, arco); }
  deleteArco(id: number): Observable<ApiResponse<void>> { return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`); }
}
