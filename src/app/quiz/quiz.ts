import { Component, inject, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { EstadoResposta } from '../types/quiz.types';
import { QuizProgressComponent } from './quiz-progress';
import { QuizAlternativesComponent } from './quiz-alternatives';
import { QuizFeedbackComponent } from './quiz-feedback';
import { QuizCompletionComponent } from './quiz-completion';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, QuizProgressComponent, QuizAlternativesComponent, QuizFeedbackComponent, QuizCompletionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-app-gradient p-4 md:p-6">
      @if (quizService.quizFinalizado) {
        <app-quiz-completion />
      } @else {
        <div class="max-w-5xl mx-auto">
          <app-quiz-progress
            [currentQuestion]="getCurrentQuestion()"
            [progressText]="quizService.progresso"
            [score]="acertos"
            [progressWidth]="getProgressWidth()"
          />

          @if (perguntaAtual) {
            <app-quiz-alternatives
              [question]="perguntaAtual"
              [selectedAlternative]="alternativaSelecionada"
              [answerState]="estadoResposta"
              (selectAlternative)="responder($event)"
            />

            @if (estadoResposta !== estadoRespostaNaoRespondida) {
              <app-quiz-feedback
                [answerState]="estadoResposta"
                [motivationalMessage]="mensagemMotivacional"
                [justification]="justificativa"
                [isLastQuestion]="isLastQuestion()"
                (nextQuestion)="proximaPergunta()"
              />
            }
          }
        </div>
      }
    </div>
  `,
  styles: []
})
export class QuizComponent implements OnInit, OnDestroy {
  protected readonly quizService = inject(QuizService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  protected readonly estadoRespostaNaoRespondida = EstadoResposta.NAO_RESPONDIDA;
  protected readonly estadoRespostaCorreta = EstadoResposta.CORRETA;

  protected perguntaAtual = this.quizService.perguntaAtual;
  protected estadoResposta = EstadoResposta.NAO_RESPONDIDA;
  protected justificativa = '';
  protected mensagemMotivacional = '';
  protected acertos = 0;
  protected alternativaSelecionada: number | undefined = undefined;

  ngOnInit(): void {
    this.quizService.estadoResposta$.pipe(takeUntil(this.destroy$)).subscribe(estado => {
      this.estadoResposta = estado;
    });

    this.quizService.justificativa$.pipe(takeUntil(this.destroy$)).subscribe(just => {
      this.justificativa = just;
    });

    this.quizService.acertos$.pipe(takeUntil(this.destroy$)).subscribe(acertos => {
      this.acertos = acertos;
    });

    this.quizService.perguntaAtualIndex$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.perguntaAtual = this.quizService.perguntaAtual;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected responder(indiceAlternativa: number): void {
    this.alternativaSelecionada = indiceAlternativa;
    this.quizService.responder(indiceAlternativa);
    this.mensagemMotivacional = this.quizService.getMensagemMotivacional(
      this.estadoResposta === EstadoResposta.CORRETA
    );
  }

  protected proximaPergunta(): void {
    this.alternativaSelecionada = undefined; // Reset para próxima pergunta
    this.quizService.proximaPergunta();
    this.perguntaAtual = this.quizService.perguntaAtual;

    if (this.quizService.quizFinalizado) {
      setTimeout(() => {
        this.router.navigate(['/resultado']);
      }, 1000);
    }
  }

  protected getProgressWidth(): number {
    const atual = parseInt(this.quizService.progresso.split('/')[0] || '0');
    const total = parseInt(this.quizService.progresso.split('/')[1] || '1');
    
    // Se ainda não respondeu nenhuma pergunta, retorna 0
    if (this.estadoResposta === EstadoResposta.NAO_RESPONDIDA && atual === 1) {
      return 0;
    }
    
    // Progresso baseado em perguntas respondidas, não na pergunta atual
    const perguntasRespondidas = atual - (this.estadoResposta === EstadoResposta.NAO_RESPONDIDA ? 1 : 0);
    return Math.max(0, (perguntasRespondidas / total) * 100);
  }

  protected getCurrentQuestion(): number {
    return parseInt(this.quizService.progresso.split('/')[0] || '0');
  }

  protected isLastQuestion(): boolean {
    const total = parseInt(this.quizService.progresso.split('/')[1] || '1');
    const current = parseInt(this.quizService.progresso.split('/')[0] || '0');
    return current === total;
  }
}
