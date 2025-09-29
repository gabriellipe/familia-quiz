import { Component, inject, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QuizService } from '../services/quiz.service';
import { EstadoResposta } from '../types/quiz.types';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      @if (quizService.quizFinalizado) {
        <div class="text-center">
          <h2 class="text-3xl font-bold mb-4">Quiz Finalizado!</h2>
          <p class="text-lg mb-6">Redirecionando para os resultados...</p>
        </div>
      } @else {
        <div class="max-w-2xl mx-auto">
          <!-- Progresso -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium">Progresso</span>
              <span class="text-sm text-muted">{{ quizService.progresso }}</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                class="bg-primary h-2 rounded-full transition-all duration-300"
                [style.width]="getProgressWidth() + '%'"
              ></div>
            </div>
          </div>

          <!-- Pergunta -->
          @if (perguntaAtual) {
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
              <h2 class="text-xl font-semibold mb-6">{{ perguntaAtual.pergunta }}</h2>

              <!-- Alternativas -->
              <div class="space-y-3">
                @for (alternativa of perguntaAtual.alternativas; track $index) {
                  <button
                    (click)="responder($index)"
                    [disabled]="estadoResposta !== estadoRespostaNaoRespondida"
                    [class]="getButtonClass($index)"
                    class="w-full p-4 rounded-lg text-left transition-all duration-200 border-2"
                  >
                    {{ alternativa.texto }}
                  </button>
                }
              </div>

              <!-- Feedback -->
              @if (estadoResposta !== estadoRespostaNaoRespondida) {
                <div class="mt-6 p-4 rounded-lg" [class]="getFeedbackClass()">
                  <div class="flex items-center mb-2">
                    <span class="text-lg mr-2">
                      {{ estadoResposta === estadoRespostaCorreta ? '✅' : '❌' }}
                    </span>
                    <span class="font-semibold">
                      {{ mensagemMotivacional }}
                    </span>
                  </div>
                  @if (justificativa) {
                    <p class="text-sm opacity-90">{{ justificativa }}</p>
                  }

                  <button
                    (click)="proximaPergunta()"
                    class="mt-4 btn-primary"
                  >
                    Próxima Pergunta
                  </button>
                </div>
              }
            </div>
          }

          <!-- Score atual -->
          <div class="text-center text-sm text-muted">
            Acertos: {{ acertos }} / {{ quizService.progresso.split('/')[1] }}
          </div>
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
    this.quizService.responder(indiceAlternativa);
    this.mensagemMotivacional = this.quizService.getMensagemMotivacional(
      this.estadoResposta === EstadoResposta.CORRETA
    );
  }

  protected proximaPergunta(): void {
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
    return (atual / total) * 100;
  }

  protected getButtonClass(index: number): string {
    const base = 'hover:border-primary focus:outline-none focus:border-primary';

    if (this.estadoResposta === EstadoResposta.NAO_RESPONDIDA) {
      return `${base} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600`;
    }

    const pergunta = this.perguntaAtual;
    if (!pergunta) return base;

    if (index === pergunta.indiceRespostaCorreta) {
      return `${base} border-green-500 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200`;
    }

    return `${base} border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 opacity-75`;
  }

  protected getFeedbackClass(): string {
    return this.estadoResposta === EstadoResposta.CORRETA
      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
      : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
  }
}
