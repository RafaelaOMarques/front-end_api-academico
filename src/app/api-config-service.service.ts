import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private baseUrl = 'http://localhost:8080/api/academico'; 

  // constructor(private http: HttpClient) {}

  getAlunoUrl(): string {
    return `${this.baseUrl}/aluno`;
  }

}
