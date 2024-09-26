import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config-service.service'; 
import { Observable } from 'rxjs';
import { Aluno } from './aluno.model'; 
@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiConfig.getAlunoUrl());
  }

  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiConfig.getAlunoUrl()}/${id}`);
  }

  createAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiConfig.getAlunoUrl(), aluno);
  }

  updateAluno(id: number, aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiConfig.getAlunoUrl()}/${id}`, aluno);
  }

  deleteAluno(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.getAlunoUrl()}/${id}`);
  }
}
