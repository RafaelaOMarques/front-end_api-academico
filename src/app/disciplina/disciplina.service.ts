import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config-service.service'; 
import { Observable } from 'rxjs';
import { Disciplina } from './disciplina.model';
@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiConfig.getDisciplinaUrl());
  }

  getDisciplinaById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiConfig.getDisciplinaUrl()}/${id}`);
  }

  createDisciplina(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiConfig.getDisciplinaUrl(), disciplina);
  }

  updateDisciplina(id: number, disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiConfig.getDisciplinaUrl()}/${id}`, disciplina);
  }

  deleteDisciplina(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.getDisciplinaUrl()}/${id}`);
  }
}
