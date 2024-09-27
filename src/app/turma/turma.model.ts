import { Aluno } from "../aluno/aluno.model";
import { Disciplina } from "../disciplina/disciplina.model";

export interface Turma {
  id: number;
  turmaId: number;
  dataInicio: Date;
  dataFim: Date;
  disciplina: Disciplina;
  alunos: Aluno[];

}