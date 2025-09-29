import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizAlternativesComponent } from './quiz-alternatives';
import { PerguntaEmbaralhada, EstadoResposta } from '../../types/quiz.types';

describe('QuizAlternativesComponent', () => {
  let component: QuizAlternativesComponent;
  let fixture: ComponentFixture<QuizAlternativesComponent>;

  const mockQuestion: PerguntaEmbaralhada = {
    pergunta: 'Test question?',
    alternativas: [
      { texto: 'Option 1', justificativa: 'Just 1' },
      { texto: 'Option 2', justificativa: 'Just 2' },
      { texto: 'Option 3', justificativa: 'Just 3' }
    ],
    indiceRespostaCorreta: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAlternativesComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizAlternativesComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    component.answerState = EstadoResposta.NAO_RESPONDIDA;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display question text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test question?');
  });

  it('should emit selectAlternative when alternative is selected', () => {
    spyOn(component.selectAlternative, 'emit');
    
    component['onSelectAlternative'](1);
    
    expect(component.selectAlternative.emit).toHaveBeenCalledWith(1);
  });

  it('should return correct isAnswered state', () => {
    expect(component['isAnswered']).toBeFalse();
    
    component.answerState = EstadoResposta.CORRETA;
    expect(component['isAnswered']).toBeTrue();
  });

  it('should return correct alternative class for neutral state', () => {
    const result = component['getAlternativeClass'](0);
    expect(result).toBe('state-neutral');
  });

  it('should return correct alternative class for selected correct answer', () => {
    component.selectedAlternative = 1;
    component.answerState = EstadoResposta.CORRETA;
    
    const result = component['getAlternativeClass'](1);
    expect(result).toContain('state-selected state-correct');
  });
});