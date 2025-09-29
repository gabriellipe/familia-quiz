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
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4 md:p-6">
      @if (quizService.quizFinalizado) {
        <div class="max-w-md mx-auto surface rounded-xl shadow-lg p-8 text-center">
          <div class="text-6xl mb-4">🎯</div>
          <h2 class="text-3xl font-bold mb-4">Quiz Finalizado!</h2>
          <p class="text-lg mb-6 text-muted">Redirecionando para os resultados...</p>
          <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      } @else {
        <div class="max-w-3xl mx-auto">
          <!-- Header com progresso -->
          <div class="surface rounded-xl shadow-lg p-6 mb-6">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {{ quizService.progresso.split('/')[0] }}
                </div>
                <div>
                  <h1 class="text-lg font-semibold">Quiz da Família</h1>
                  <span class="text-sm text-muted">Pergunta {{ quizService.progresso }}</span>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm text-muted">Acertos</div>
                <div class="text-2xl font-bold text-primary">{{ acertos }}</div>
              </div>
            </div>
            
            <!-- Barra de progresso melhorada -->
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-500 ease-out"
                [style.width]="getProgressWidth() + '%'"
              ></div>
            </div>
            <div class="text-xs text-muted mt-2 text-center">
              {{ getProgressWidth() | number:'1.0-0' }}% concluído
            </div>
          </div>

          <!-- Pergunta -->
          @if (perguntaAtual) {
            <div class="surface rounded-xl shadow-lg p-6 md:p-8">
              <div class="flex items-start gap-4 mb-8">
                <div class="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-indigo-600 dark:text-indigo-400 font-bold">?</span>
                </div>
                <h2 class="text-xl md:text-2xl font-semibold leading-relaxed">{{ perguntaAtual.pergunta }}</h2>
              </div>

              <!-- Alternativas com design melhorado -->
              <div class="space-y-4">
                @for (alternativa of perguntaAtual.alternativas; track $index) {
                  <button
                    (click)="responder($index)"
                    [disabled]="estadoResposta !== estadoRespostaNaoRespondida"
                    [class]="getButtonClass($index)"
                    class="w-full p-5 rounded-xl text-left transition-all duration-300 border-2 hover:scale-102 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <div class="flex items-start gap-3">
                      <div class="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 mt-1">
                        <div class="w-2 h-2 rounded-full bg-current opacity-0 transition-opacity duration-200" 
                             [class.opacity-100]="isSelected($index)"></div>
                      </div>
                      <span class="font-medium leading-relaxed">{{ alternativa.texto }}</span>
                    </div>
                  </button>
                }
              </div>

              <!-- Feedback melhorado -->
              @if (estadoResposta !== estadoRespostaNaoRespondida) {
                <div class="mt-8 p-6 rounded-xl border-2" [class]="getFeedbackClass()">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl">
                      {{ estadoResposta === estadoRespostaCorreta ? '✅' : '❌' }}
                    </div>
                    <div>
                      <div class="font-bold text-lg">{{ mensagemMotivacional }}</div>
                      <div class="text-sm opacity-75">
                        {{ estadoResposta === estadoRespostaCorreta ? 'Resposta correta!' : 'Resposta incorreta' }}
                      </div>
                    </div>
                  </div>
                  
                  @if (justificativa) {
                    <div class="bg-white/10 dark:bg-black/10 rounded-lg p-4 mb-4">
                      <p class="text-sm leading-relaxed">{{ justificativa }}</p>
                    </div>
                  }

                  <button
                    (click)="proximaPergunta()"
                    class="btn-primary w-full md:w-auto px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
                  >
                    {{ isLastQuestion() ? '🏁 Ver Resultado' : '➡️ Próxima Pergunta' }}
                  </button>
                </div>
              }
            </div>
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
    const base = 'hover:border-primary/50 focus:border-primary';

    if (this.estadoResposta === EstadoResposta.NAO_RESPONDIDA) {
      return `${base} border-gray-300 dark:border-gray-600 surface hover:bg-blue-50 dark:hover:bg-blue-900/20 text-current`;
    }

    const pergunta = this.perguntaAtual;
    if (!pergunta) return base;

    if (index === pergunta.indiceRespostaCorreta) {
      return `${base} border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300`;
    }

    return `${base} border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 opacity-75`;
  }

  protected getFeedbackClass(): string {
    return this.estadoResposta === EstadoResposta.CORRETA
      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200';
  }

  protected isSelected(index: number): boolean {
    return false; // Placeholder for visual selection indicator
  }

  protected isLastQuestion(): boolean {
    const total = parseInt(this.quizService.progresso.split('/')[1] || '1');
    const current = parseInt(this.quizService.progresso.split('/')[0] || '0');
    return current === total;
  }
}
