import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { NgModule } from '@angular/core';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { TurmaComponent } from './turma/turma.component';

export const routes: Routes = [
  {
    path: '', 
    title: 'Home',
    component: HomeComponent
  },
  {
    path: 'aluno',
    title:'Aluno',
    component: AlunoComponent
  },
  {
    path: 'professor',
    title:'Professor',
    component: ProfessorComponent
  },
  {
    path: 'disciplina',
    title:'Disciplina',
    component: DisciplinaComponent
  },
  {
    path: 'matricula',
    title:'Matriculas ',
    component: MatriculaComponent
  },
  {
    path: 'turma',
    title:'Turmas',
    component: TurmaComponent
  },
];
