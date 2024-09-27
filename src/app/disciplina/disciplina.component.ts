import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Disciplina } from './disciplina.model';
import { DisciplinaService } from './disciplina.service';

@Component({
  selector: 'app-disciplina',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './disciplina.component.html'
})
export class DisciplinaComponent implements OnInit{
  disciplinaForm!: FormGroup;
  disciplinas: Disciplina[] = [];
  errorMensagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private disciplinaService: DisciplinaService,){
    this.disciplinaForm = this.formBuilder.group({
      // id: ['', Validators.required],
      // disciplinaId: ['', Validators.required],
      nome: ['', Validators.required],
      numeroCreditos: ['', Validators.required],
      professorId: ['', Validators.required],
    })

  }
  ngOnInit(): void {}

  cadastrarDisciplina(): void {

    if (this.disciplinaForm.valid){
      const disciplina: Disciplina = this.disciplinaForm.value;
      console.log(disciplina);
      this.disciplinaService.createDisciplina(disciplina).subscribe({
        next:(res) =>{
          console.log('Disciplina cadastrada com sucesso', res);
          this.sucessoMensagem = 'Disciplina cadastrada com sucesso!';
          this.consultarDisciplinas();
          this.errorMensagem = null;
          this.disciplinaForm.reset();
          this.modalSucesso = true;
        },
        error: (err) =>{
          console.error('Erro ao cadastrar disciplina', err);
          this.errorMensagem = 'Erro ao cadastrar disciplina';
          this.sucessoMensagem = null;
        } 
      });
    } else{
      this.errorMensagem = 'Erro ao cadastrar disciplina. Preencha os campos obrigatórios (Nome, Creditos, Professor Id)';

    }
    
  }

  handleSubmit(){
    this.cadastrarDisciplina();
  }
  
  consultarDisciplinas(): void{
    this.disciplinaService.getAllDisciplinas().subscribe({
      next: (res) => {
        this.disciplinas = res;
        this.exibeFormulario = true;
        console.log('Disciplinas: ', this.disciplinas);
        this.errorMensagem = null;
      },
      error: (err) =>{
        console.error('Erro ao consultar disciplinas', err);
        this.errorMensagem = 'Erro ao consultar disciplinas';
      }
    })
  }

  async deletarDisciplina(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID da Disciplina não encontrado');
      return;
    }

    if (confirm(`Tem certeza que deseja deletar a disciplina id: ${id}? Essa ação é irreversível!`)) {
      this.disciplinaService.deleteDisciplina(id).subscribe({
        next: (res) => {
          console.log('Disciplina deletada com sucesso', res);
            this.consultarDisciplinas();
            this.modalSucesso = true;
            this.sucessoMensagem = 'Disciplina deletado com sucesso!'
        },
        error: (err) => {
          console.error('Erro ao deletar disciplina', err);
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
    this.disciplinaForm.reset();
    this.errorMensagem = null;
  }
}
