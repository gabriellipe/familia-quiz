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
    <div class="min-h-screen bg-app-gradient flex items-center justify-center p-4 md:p-6">
      <div class="max-w-4xl mx-auto">
        <div class="surface rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <!-- Header com emoji animado -->
          <div class="mb-8">
            <div class="inline-block p-6 bg-blue-context rounded-full mb-6 animate-bounce">
              <div class="text-7xl">{{ getEmoji() }}</div>
            </div>
            <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quiz Finalizado!
            </h1>
            <p class="text-lg text-muted">Veja como você se saiu</p>
          </div>

          <!-- Score principal -->
          <div class="mb-10">
            <div class="inline-block p-8 bg-gradient-to-br from-primary to-blue-600 rounded-3xl text-white shadow-xl mb-6">
              <div class="text-6xl md:text-7xl font-black mb-2">
                {{ resultado.porcentagem }}%
              </div>
              <div class="text-lg opacity-90">
                {{ resultado.acertos }} de {{ resultado.total }} acertos
              </div>
            </div>
          </div>

          <!-- Barra de progresso decorativa -->
          <div class="mb-8">
            <div class="w-full bg-progress-track rounded-full h-6 mb-6 overflow-hidden shadow-inner">
              <div 
                class="h-full rounded-full transition-all duration-2000 ease-out flex items-center justify-end pr-2"
                [class]="getProgressBarClass()"
                [style.width]="resultado.porcentagem + '%'"
              >
                <div class="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
              </div>
            </div>

            <div class="p-6 rounded-2xl border-2" [class]="getMessageContainerClass()">
              <p class="text-xl font-bold mb-2" [class]="getMessageClass()">
                {{ resultado.mensagem }}
              </p>
              <p class="text-sm opacity-75">{{ getPerformanceMessage() }}</p>
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-3 gap-4 mb-8">
            <div class="surface-variant rounded-xl p-4">
              <div class="text-2xl font-bold text-primary">{{ resultado.total }}</div>
              <div class="text-xs text-muted">Perguntas</div>
            </div>
            <div class="surface-variant rounded-xl p-4">
              <div class="text-2xl font-bold text-excellent">{{ resultado.acertos }}</div>
              <div class="text-xs text-muted">Acertos</div>
            </div>
            <div class="surface-variant rounded-xl p-4">
              <div class="text-2xl font-bold text-needs-improvement">{{ resultado.total - resultado.acertos }}</div>
              <div class="text-xs text-muted">Erros</div>
            </div>
          </div>

          <!-- Botões de ação -->
          <div class="space-y-4">
            <button
              (click)="reiniciarQuiz()"
              class="w-full btn-primary py-4 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span class="text-xl">🔄</span>
              Jogar Novamente
            </button>

            <button
              (click)="voltarInicio()"
              class="w-full py-4 px-8 text-lg font-medium rounded-xl border-2 border-custom surface surface-hover transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span class="text-xl">🏠</span>
              Voltar ao Início
            </button>
          </div>

          <!-- Sharing section -->
          <div class="mt-8 pt-6 border-t border-custom">
            <p class="text-sm text-muted mb-4">Compartilhe seu resultado:</p>
            <div class="inline-block px-4 py-2 bg-card-subtle rounded-lg text-sm text-muted">
              🧩 Consegui {{ resultado.porcentagem }}% no Quiz da Família!
            </div>
          </div>
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
    if (porcentagem >= 80) return 'progress-excellent';
    if (porcentagem >= 50) return 'progress-good';
    return 'progress-needs-improvement';
  }

  protected getMessageClass(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 80) return 'text-excellent';
    if (porcentagem >= 50) return 'text-good';
    return 'text-needs-improvement';
  }

  protected getMessageContainerClass(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 80) return 'container-excellent';
    if (porcentagem >= 50) return 'container-good';
    return 'container-needs-improvement';
  }

  protected getPerformanceMessage(): string {
    const porcentagem = this.resultado.porcentagem;
    if (porcentagem >= 95) return 'Desempenho perfeito! Você é um expert em uso consciente de tecnologia!';
    if (porcentagem >= 80) return 'Excelente desempenho! Você entende bem sobre tecnologia e família.';
    if (porcentagem >= 50) return 'Bom trabalho! Continue aprendendo sobre uso equilibrado de tecnologia.';
    return 'Que tal estudar mais sobre o tema? Há sempre espaço para crescer!';
  }

  protected reiniciarQuiz(): void {
    this.quizService.reiniciarQuiz();
    this.quizService.carregarPerguntas().subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }

  protected voltarInicio(): void {
    this.router.navigate(['/']);
  }
}