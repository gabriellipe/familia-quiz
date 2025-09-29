import {provideZoneChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {QuizAlternativeButton} from '../../../app/quiz/quiz-alternative-button';
import {Alternativa} from '../../../app/types/quiz.types';

describe('QuizAlternativeButton', () => {
  let component: QuizAlternativeButton;
  let fixture: ComponentFixture<QuizAlternativeButton>;

  const mockAlternative: Alternativa = {
    texto: 'Test alternative',
    justificativa: 'Test justification'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizAlternativeButton],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuizAlternativeButton);
    component = fixture.componentInstance;
    component.alternative = mockAlternative;
    component.index = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display alternative text', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain('Test alternative');
  });

  it('should emit selectAlternative when clicked and not disabled', () => {
    spyOn(component.selectAlternative, 'emit');
    component.disabled = false;
    
    component['onSelect']();
    
    expect(component.selectAlternative.emit).toHaveBeenCalledWith(0);
  });

  it('should not emit selectAlternative when disabled', () => {
    spyOn(component.selectAlternative, 'emit');
    component.disabled = true;
    
    component['onSelect']();
    
    expect(component.selectAlternative.emit).not.toHaveBeenCalled();
  });

  it('should show selected state when isSelected is true', () => {
    component.isSelected = true;
    fixture.detectChanges();
    
    const radioIndicator = fixture.nativeElement.querySelector('.w-2.h-2');
    expect(radioIndicator.classList).toContain('opacity-100');
  });
});