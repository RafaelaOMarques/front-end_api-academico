import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Turma } from './turma.model';
import { TurmaService } from './turma.service';

@Component({
  selector: 'app-turma',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],  templateUrl: './turma.component.html',
})
export class TurmaComponent implements OnInit{
  turmaForm!: FormGroup;
  turmas: Turma[] = [];
  errorMensagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private turmaService: TurmaService,){
    this.turmaForm = this.formBuilder.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      disciplinaId: ['', Validators.required],
      turmaAlunos: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.turmaService.getAllTurmas().subscribe(data => {
      this.turmas = data;
    });
  }

  cadastrarTurma(): void {
    if (this.turmaForm.valid){
      const turma: Turma = this.turmaForm.value;
      console.log(turma);
      this.turmaService.createTurma(turma).subscribe({
        next:(res) =>{
          console.log('Turma cadastrada com sucesso', res);
          this.sucessoMensagem = 'Turma cadastrada com sucesso!';
          this.consultarTurmas();
          this.errorMensagem = null;
          this.turmaForm.reset();
          this.modalSucesso = true;
        },
        error: (err) =>{
          console.error('Erro ao cadastrar turma', err);
          this.errorMensagem = 'Erro ao cadastrar turma';
          this.sucessoMensagem = null;
        } 
      });
    } else{
      this.errorMensagem = 'Erro ao cadastrar turma. Preencha todos campos obrigatórios';
    }
  }

  handleSubmit(){
    this.cadastrarTurma();
  }
  
  consultarTurmas(): void{
    this.turmaService.getAllTurmas().subscribe({
      next: (res) => {
        this.turmas = res;
        this.exibeFormulario = true;
        console.log('turmas: ', this.turmas);
        this.errorMensagem = null;
      },
      error: (err) =>{
        console.error('Erro ao consultar turmas', err);
        this.errorMensagem = 'Erro ao consultar turmas';
      }
    })
  }

  async deletarTurma(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID da turma não encontrado');
      return;
    }

    if (confirm(`Tem certeza que deseja deletar a turma id: ${id}? Essa ação é irreversível!`)) {
      this.turmaService.deleteTurma(id).subscribe({
        next: (res) => {
          console.log('turma deletada com sucesso', res);
            this.consultarTurmas();
            this.modalSucesso = true;
            this.sucessoMensagem = 'turma deletado com sucesso!'
        },
        error: (err) => {
          console.error('Erro ao deletar turma', err);
        }
      });
    }
  };

  exibirFormulario(): void {
    this.exibeFormulario = true;
  }

  closeModal() {
    this.modalSucesso = false; 
  }
  
  limparForm(){
    this.turmaForm.reset();
    this.errorMensagem = null;
  }
}

