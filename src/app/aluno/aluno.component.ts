import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AlunoService } from './aluno.service';
import { Aluno } from './aluno.model';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-aluno',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, NgxMaskDirective ,  NgxMaskPipe],
  providers:[provideNgxMask() ],
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.scss'] 
})
export class AlunoComponent implements OnInit {
  alunoForm!: FormGroup;
  alunos: Aluno[] = [];
  errorMessagem: string | null = null;
  sucessoMensagem: string | null = null;
  alerta: string | null = null;
  modalSucesso = false;
  // modalConfirmar: NgbModal;

  exibeFormulario: boolean = false;

  constructor(private formBuilder: FormBuilder, private alunoService: AlunoService, 
    // private modalService: NgbModal
  ) {
    // this.modalConfirmar = modalService;
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
      this.alunoService.createAluno(aluno).subscribe({
        next: (res) => {
          console.log('Aluno cadastrado com sucesso', res);
          this.sucessoMensagem = 'Aluno cadastrado com sucesso!';
          this.errorMessagem = null;
          this.alunoForm.reset();
          this.modalSucesso = true;
        },
        error: (err) => {
          console.error('Erro ao cadastrar aluno', err);
          this.errorMessagem = 'Erro ao cadastrar aluno';
          this.sucessoMensagem = null;
        }
      });
    }
    this.errorMessagem = 'Erro ao cadastrar aluno. Preencha os campos obrigatórios (Nome, CPF, data de nasc, e-mail e celular)';
    this.sucessoMensagem = null;
  }

  handleSubmit() {
    this.cadastrarAluno();
  }

  // alterarAluno(): void {
  //   if (this.alunoForm.valid) {
  //     const aluno: Aluno = this.alunoForm.value;
  //     this.alunoService.updateAluno(id: number, aluno: Aluno).subscribe({
  //       next: (res) => {
  //         console.log('Aluno cadastrado com sucesso', res);
  //         this.sucessoMensagem = 'Aluno atualizado com sucesso!';
  //         this.errorMessagem = null;
  //         this.alunoForm.reset();
  //         this.modalSucesso = true;
  //       },
  //       error: (err) => {
  //         console.error('Erro ao atualizar aluno', err);
  //         this.errorMessagem = 'Erro ao atualizar aluno';
  //         this.sucessoMensagem = null;
  //       }
  //     });
  //   }
  //   this.errorMessagem = 'Erro ao cadastrar aluno. Preencha os campos obrigatórios (Nome, CPF, data de nasc, e-mail e celular)';
  //   this.sucessoMensagem = null;
  // }
  
  // handleSubmitAlterar() {
  //   this.alterarAluno();
  // }

  consultarAlunos(): void {
    this.alunoService.getAllAlunos().subscribe({
      next: (res) => {
        this.alunos = res;
        this.exibeFormulario = true;
        console.log('Alunos:', this.alunos);
        this.errorMessagem = null;  

      },
      error: (err) => {
        console.error('Erro ao consultar alunos', err);
        this.errorMessagem = 'Erro ao consultar alunos: ' + err.message;
      }
    });
  }

  
  async deletarAluno(id: number | undefined): Promise<void>{
    if (id === undefined) {
      console.error('ID do aluno não encontrado');
      return;
    }
    const confirmado = await this.openModalConfirmar();

    if (true) {
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

  selecionarAluno(aluno: Aluno): void{
    this.alunoForm.patchValue({
      id: aluno.id, // Caso o ID seja necessário para atualização
      nome: aluno.nome,
      cpf: aluno.cpf,
      dataNascimento: aluno.dataNascimento,
      email: aluno.email,
      celular: aluno.celular,
      apelido: aluno.apelido
    });
  }

  exibirFormulario(): void {
    this.exibeFormulario = true;
  }

  closeModal() {
    this.modalSucesso = false; 
  }

  openModalConfirmar(){
    // return new Promise((resolve) => {
    //   // Verifique se modalConfirmar está definido antes de chamá-lo
    //   if (this.modalConfirmar) {
    //     const modal = this.modalConfirmar.open('modalConfirmar');
        
    //     modal.result.then(
    //       () => resolve(true),
    //       () => resolve(false)
    //     );
    //   } else {
    //     console.error('Modal não está definido');
    //     resolve(false);
    //   }
    // });
  }
  
  
}
