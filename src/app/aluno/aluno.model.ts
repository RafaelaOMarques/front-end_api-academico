export interface Aluno {
  id?: number;
  nome: string;
  cpf: string;
  dataNascimento: Date; // Use string para representar a data no formato adequado
  email: string;
  celular: string;
  apelido?: string;
}
