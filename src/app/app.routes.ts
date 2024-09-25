import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { NgModule } from '@angular/core';

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
];
