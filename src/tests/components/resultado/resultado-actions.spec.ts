import {provideZoneChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ResultadoActionsComponent} from '../../../app/resultado/resultado-actions';

describe('ResultadoActionsComponent', () => {
  let component: ResultadoActionsComponent;
  let fixture: ComponentFixture<ResultadoActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoActionsComponent],
      providers: [provideZoneChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultadoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit restartQuiz when restart button is clicked', () => {
    spyOn(component.restartQuiz, 'emit');
    
    component['onRestartQuiz']();
    
    expect(component.restartQuiz.emit).toHaveBeenCalled();
  });

  it('should emit goHome when home button is clicked', () => {
    spyOn(component.goHome, 'emit');
    
    component['onGoHome']();
    
    expect(component.goHome.emit).toHaveBeenCalled();
  });

  it('should have restart quiz button', () => {
    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});