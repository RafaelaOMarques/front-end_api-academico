import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ProfessorService } from './professor.service';
import { Professor } from './professor.model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-professor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective ,  NgxMaskPipe],
  providers:[provideNgxMask() ],
  templateUrl: './professor.component.html',
})
export class ProfessorComponent implements OnInit {
  professorForm!: FormGroup;
  professores: Professor[] = [];
  errorMensagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private professorService: ProfessorService, 
  ) {
    this.professorForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      apelido: ['']
    });
  }

  ngOnInit(): void {}

  cadastrarProfessor(): void {
    if (this.professorForm.valid) {
      const professor: Professor = this.professorForm.value;

      professor.cpf = this.formatarCpf(professor.cpf);
      professor.celular = this.formatarCelular(professor.celular);

      this.professorService.createProfessor(professor).subscribe({
        next: (res) => {
          console.log('Professor cadastrado com sucesso', res);
          this.sucessoMensagem = 'Professor cadastrado com sucesso!';
          this.consultarProfessores();
          this.errorMensagem = null;
          this.professorForm.reset();
          this.modalSucesso = true;
        },
        error: (err) => {
          console.error('Erro ao cadastrar professor', err);
          this.errorMensagem = 'Erro ao cadastrar professor';
          this.sucessoMensagem = null;
        }
      });
    } else {
      this.errorMensagem = 'Erro ao cadastrar professor. Preencha os campos obrigatórios (Nome, CPF, data de nasc, e-mail e celular)';
    }

  }

  handleSubmit() {
    this.cadastrarProfessor();
  }


  consultarProfessores(): void {
    this.professorService.getAllProfessores().subscribe({
      next: (res) => {
        this.professores = res.map((item: any) => item.professor);
        this.exibeFormulario = true;
        console.log('Professores:', this.professores);
        this.errorMensagem = null;  

      },
      error: (err) => {
        console.error('Erro ao consultar professores', err);
        this.errorMensagem = 'Erro ao consultar professores: ' + err.message;
      }
    });
  }

  
  async deletarProfessor(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID do professor não encontrado');
      return;
    }

    if (confirm(`Tem certeza que deseja deletar o professor id: ${id}? Essa ação é irreversível!`)) {
      this.professorService.deleteProfessor(id).subscribe({
        next: (res) => {
          console.log('Professor deletado com sucesso', res);
            this.consultarProfessores();
            this.modalSucesso = true;
            this.sucessoMensagem = 'Professor deletado com sucesso!'
        },
        error: (err) => {
          console.error('Erro ao deletar professor', err);
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
    this.professorForm.reset();
    this.errorMensagem = null;

  }
  
}
