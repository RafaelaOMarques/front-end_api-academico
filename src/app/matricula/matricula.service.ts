import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from '../api-config-service.service'; 
import { Observable } from 'rxjs';
import { Matricula } from './matricula.model';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {}

  getAllMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.apiConfig.getMatriculaUrl());
  }

  getMatriculaById(id: number): Observable<Matricula> {
    return this.http.get<Matricula>(`${this.apiConfig.getMatriculaUrl()}/${id}`);
  }

  createMatricula(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.apiConfig.getMatriculaUrl(), matricula);
  }

  updateMatricula(id: number, matricula: Matricula): Observable<Matricula> {
    return this.http.put<Matricula>(`${this.apiConfig.getMatriculaUrl()}/${id}`, matricula);
  }

  deleteMatricula(id: number): Observable<any> {
    return this.http.delete(`${this.apiConfig.getMatriculaUrl()}/${id}`);
  }
}
