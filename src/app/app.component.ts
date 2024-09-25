import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlunoComponent } from './aluno/aluno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiConfigService } from './api-config-service.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    HomeComponent, 
    AlunoComponent, 
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule, 
    NgxMaskDirective,
    NgxMaskPipe 
  ],
  providers: [ApiConfigService, provideNgxMask()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'front-end_api-academico';
}
