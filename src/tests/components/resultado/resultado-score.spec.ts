import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultadoScoreComponent } from '../../../app/components/resultado/resultado-score';
import { ResultadoQuiz } from '../../../app/types/quiz.types';

describe('ResultadoScoreComponent', () => {
  let component: ResultadoScoreComponent;
  let fixture: ComponentFixture<ResultadoScoreComponent>;

  const mockResultado: ResultadoQuiz = {
    acertos: 8,
    total: 10,
    porcentagem: 80,
    mensagem: 'Test message'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoScoreComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoScoreComponent);
    component = fixture.componentInstance;
    component.resultado = mockResultado;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct score', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('8/10');
  });

  it('should display correct percentage', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('80%');
  });

  it('should display "Parabéns!" title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Parabéns!');
  });
});