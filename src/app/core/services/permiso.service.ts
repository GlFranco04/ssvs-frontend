import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permiso } from '../models/permiso';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {
  private apiUrl = 'http://localhost:8080/api/permiso';
  private token = localStorage.getItem('token'); 

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getPermisos(): Observable<Permiso[]> {
    return this.http.get<Permiso[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getPermisoById(id: number): Observable<Permiso> {
    return this.http.get<Permiso>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createPermiso(permiso: Permiso): Observable<Permiso[]> {
    return this.http.post<Permiso[]>(this.apiUrl, permiso, { headers: this.getAuthHeaders() });
  }

  updatePermiso(permiso: Permiso): Observable<Permiso> {
    return this.http.put<Permiso>(`${this.apiUrl}/${permiso.id}`, permiso, { headers: this.getAuthHeaders() });
  }

  deletePermiso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}