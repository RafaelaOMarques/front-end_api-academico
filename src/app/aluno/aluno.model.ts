import { Turma } from "../turma/turma.model";

export interface Aluno {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: Date; 
  email: string;
  celular: string;
  apelido?: string;
  turma?: Turma;
}
