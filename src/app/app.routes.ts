import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { NgModule } from '@angular/core';
import { ProfessorComponent } from './professor/professor.component';
import { DisciplinaComponent } from './disciplina/disciplina.component';
import { MatriculaComponent } from './matricula/matricula.component';

export const routes: Routes = [
  {
    path: '', 
    title: 'Home Page',
    component: HomeComponent
  },
  {
    path: 'aluno',
    title:'Aluno Page',
    component: AlunoComponent
  },
  {
    path: 'professor',
    title:'Professor Page',
    component: ProfessorComponent
  },
  {
    path: 'disciplina',
    title:'Disciplina Page',
    component: DisciplinaComponent
  },
  {
    path: 'matricula',
    title:'Matricula Page',
    component: MatriculaComponent
  },
];
