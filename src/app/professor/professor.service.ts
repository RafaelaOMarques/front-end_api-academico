import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config-service.service'; 
import { Observable } from 'rxjs';
import { Professor } from './professor.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiConfig.getProfessorUrl());
  }

  getProfessorById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiConfig.getProfessorUrl()}/${id}`);
  }

  createProfessor(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiConfig.getProfessorUrl(), professor);
  }

  updateProfessor(id: number, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiConfig.getProfessorUrl()}/${id}`, professor);
  }

  deleteProfessor(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.getProfessorUrl()}/${id}`);
  }
}
