import { provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HomeComponent } from './home';
import { QuizService } from '../../services/quiz.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockQuizService: jasmine.SpyObj<QuizService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const quizServiceSpy = jasmine.createSpyObj('QuizService', ['reiniciarQuiz', 'carregarPerguntas']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZoneChangeDetection(),
        { provide: QuizService, useValue: quizServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    mockQuizService = TestBed.inject(QuizService) as jasmine.SpyObj<QuizService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    mockQuizService.carregarPerguntas.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should restart quiz and navigate when iniciarQuiz is called', () => {
    component.iniciarQuiz();

    expect(mockQuizService.reiniciarQuiz).toHaveBeenCalled();
    expect(mockQuizService.carregarPerguntas).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/quiz']);
  });
});