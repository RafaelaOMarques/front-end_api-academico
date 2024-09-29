import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiConfigService } from './api-config-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { TurmaComponent } from './turma/turma.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    HomeComponent, 
    AlunoComponent, 
    ProfessorComponent,
    DisciplinaComponent,
    MatriculaComponent,
    TurmaComponent,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    NgxMaskDirective,
    NgxMaskPipe 
  ],
  providers: [ApiConfigService, provideNgxMask()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'front-end_api-academico';
}
