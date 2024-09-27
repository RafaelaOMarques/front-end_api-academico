import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { Matricula } from './matricula.model';
import { MatriculaService } from './matricula.service';

@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
   templateUrl: './matricula.component.html',
})
export class MatriculaComponent implements OnInit{
  matriculaForm!: FormGroup;
  matriculas: Matricula[] = [];
  errorMensagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private matriculaService: MatriculaService,){
    this.matriculaForm = this.formBuilder.group({
      matriculaAtiva: ['', Validators.required],
      alunoId: ['', Validators.required],
    })

  }
  ngOnInit(): void {}

  cadastrarMatricula(): void {

    if (this.matriculaForm.valid){
      const matricula: Matricula = this.matriculaForm.value;
      console.log(matricula);
      this.matriculaService.createMatricula(matricula).subscribe({
        next:(res) =>{
          console.log('Matricula cadastrada com sucesso', res);
          this.sucessoMensagem = 'Matricula cadastrada com sucesso!';
          this.consultarMatriculas();
          this.errorMensagem = null;
          this.matriculaForm.reset();
          this.modalSucesso = true;
        },
        error: (err) =>{
          console.error('Erro ao cadastrar matricula', err);
          this.errorMensagem = 'Erro ao cadastrar matricula';
          this.sucessoMensagem = null;
        } 
      });
    } else{
      this.errorMensagem = 'Erro ao cadastrar matricula. Preencha todos campos obrigatórios';
    }
  }

  handleSubmit(){
    this.cadastrarMatricula();
  }
  
  consultarMatriculas(): void{
    this.matriculaService.getAllMatriculas().subscribe({
      next: (res) => {
        this.matriculas = res;
        this.exibeFormulario = true;
        console.log('Matriculas: ', this.matriculas);
        this.errorMensagem = null;
      },
      error: (err) =>{
        console.error('Erro ao consultar matriculas', err);
        this.errorMensagem = 'Erro ao consultar matriculas';
      }
    })
  }

  async deletarMatricula(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID da Matricula não encontrado');
      return;
    }

    if (confirm(`Tem certeza que deseja deletar a matricula id: ${id}? Essa ação é irreversível!`)) {
      this.matriculaService.deleteMatricula(id).subscribe({
        next: (res) => {
          console.log('Matricula deletada com sucesso', res);
            this.consultarMatriculas();
            this.modalSucesso = true;
            this.sucessoMensagem = 'Matricula deletado com sucesso!'
        },
        error: (err) => {
          console.error('Erro ao deletar matricula', err);
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
    this.matriculaForm.reset();
    this.errorMensagem = null;
  }
}

