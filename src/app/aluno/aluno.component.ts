import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective ,  NgxMaskPipe],
  providers:[provideNgxMask() ],
  templateUrl: './aluno.component.html',
})
export class AlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  alunos: Aluno[] = [];
  errorMensagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private alunoService: AlunoService, 
  ) {
    this.alunoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      apelido: ['']
    });
  }

  ngOnInit(): void {}

  cadastrarAluno(): void {
    if (this.alunoForm.valid) {
      const aluno: Aluno = this.alunoForm.value;

      aluno.cpf = this.formatarCpf(aluno.cpf);
      aluno.celular = this.formatarCelular(aluno.celular);

      this.alunoService.createAluno(aluno).subscribe({
        next: (res) => {
          console.log('Aluno cadastrado com sucesso', res);
          this.sucessoMensagem = 'Aluno cadastrado com sucesso!';
          this.consultarAlunos();

          this.errorMensagem = null;
          this.alunoForm.reset();
          this.modalSucesso = true;
        },
        error: (err) => {
          console.error('Erro ao cadastrar aluno', err);
          this.errorMensagem = 'Erro ao cadastrar aluno';
          this.sucessoMensagem = null;
        }
      });
    } else{
      this.errorMensagem = 'Erro ao cadastrar aluno. Preencha os campos obrigatórios (Nome, CPF, data de nasc, e-mail e celular)';

    }

  }

  handleSubmit() {
    this.cadastrarAluno();
  }

  consultarAlunos(): void {
    this.alunoService.getAllAlunos().subscribe({
      next: (res) => {
        this.alunos = res;
        this.exibeFormulario = true;
        console.log('Alunos:', this.alunos);
        this.errorMensagem = null;  
      },
      error: (err) => {
        console.error('Erro ao consultar alunos', err);
        this.errorMensagem = 'Erro ao consultar alunos: ' + err.message;
      }
    });
  }

  async deletarAluno(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID do aluno não encontrado');
      return;
    }

    if (confirm(`Tem certeza que deseja deletar o aluno id: ${id}? Essa ação é irreversível!`)) {
      this.alunoService.deleteAluno(id).subscribe({
        next: (res) => {
          console.log('Aluno deletado com sucesso', res);
            this.consultarAlunos();
            this.modalSucesso = true;
            this.sucessoMensagem = 'Aluno deletado com sucesso!'
        },
        error: (err) => {
          console.error('Erro ao deletar aluno', err);
        }
      });
    }
  };

  formatarCpf(cpf: string): string {
    cpf = cpf.replace(/\D/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarCelular(celular: string): string {
    celular = celular.replace(/\D/g, '');
    return celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
  }

  exibirFormulario(): void {
    this.exibeFormulario = true;
  }

  closeModal() {
    this.modalSucesso = false; 
  }
  
  limparForm(){
    this.alunoForm.reset();
    this.errorMensagem = null;
  }
}
