import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config-service.service'; 
import { Observable } from 'rxjs';
import { Turma } from './turma.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiConfig.getTurmaUrl());
  }

  getTurmaById(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiConfig.getTurmaUrl()}/${id}`);
  }

  createTurma(turma: Turma): Observable<Turma> {
    return this.http.post<Turma>(this.apiConfig.getTurmaUrl(), turma);
  }

  updateTurma(id: number, turma: Turma): Observable<Turma> {
    return this.http.put<Turma>(`${this.apiConfig.getTurmaUrl()}/${id}`, turma);
  }

  deleteTurma(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.getTurmaUrl()}/${id}`);
  }
}
