import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaComponent } from '../app/disciplina/disciplina.component';

describe('DisciplinaComponent', () => {
  let component: DisciplinaComponent;
  let fixture: ComponentFixture<DisciplinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisciplinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
