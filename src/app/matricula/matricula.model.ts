import { Aluno } from "../aluno/aluno.model";

export interface Matricula {
  id: number;
  matricula: number;
  matriculaAtiva: boolean;
  numeroCreditos: number;
  idAluno?: number;
}