import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Medico } from '../models/medico';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/api/medico';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  getMedicos(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getMedicoById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  createMedico(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.apiUrl, medico, { headers: this.getAuthHeaders() });
  }

  updateMedico(medico: Medico): Observable<Medico> {
    return this.http.put<Medico>(`${this.apiUrl}/${medico.id}`, medico, { headers: this.getAuthHeaders() });
  }

  deleteMedico(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getMedicoByUsuarioId(usuarioId: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

}