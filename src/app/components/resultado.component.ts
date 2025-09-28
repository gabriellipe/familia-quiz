import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6">
      <div class="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div class="mb-6">
          <div class="text-6xl mb-4">{{ getEmoji() }}</div>
          <h1 class="text-3xl font-bold mb-2">Quiz Finalizado!</h1>
        </div>

        <div class="mb-6">
          <div class="text-4xl font-bold text-primary mb-2">
            {{ resultado.porcentagem }}%
          </div>
          <p class="text-gray-600 dark:text-gray-400">
            {{ resultado.acertos }} acertos de {{ resultado.total }} perguntas
          </p>
        </div>

        <div class="mb-8">
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-4">
            <div 
              class="h-4 rounded-full transition-all duration-1000 ease-out"
              [class]="getProgressBarClass()"
              [style.width]="resultado.porcentagem + '%'"
            ></div>
          </div>

          <p class="text-lg font-medium" [class]="getMessageClass()">
            {{ resultado.mensagem }}
          </p>
        </div>

        <div class="space-y-3">
          <button
            (click)="reiniciarQuiz()"
            class="w-full btn-primary"
          >
            Jogar Novamente
          </button>

          <button
            (click)="voltarInicio()"
            class="w-full btn bg-gray-500 text-white hover:bg-gray-600"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ResultadoComponent {
  protected readonly quizService = inject(QuizService);
  private readonly router = inject(Router);

  protected readonly resultado = this.quizService.calcularResultado();

  protected getEmoji(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 95) return '🏆';
    if (porcentagem >= 80) return '🎉';
    if (porcentagem >= 50) return '👍';
    return '💪';
  }

  protected getProgressBarClass(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 80) return 'bg-green-500';
    if (porcentagem >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  protected getMessageClass(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 80) return 'text-green-600 dark:text-green-400';
    if (porcentagem >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  }

  protected reiniciarQuiz(): void {
    this.quizService.reiniciarQuiz();
    this.quizService.carregarPerguntas().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  protected voltarInicio(): void {
    this.router.navigate(['/']);
  }
}