import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {QuizService} from '../services/quiz.service';
import {ResultadoHeaderComponent} from './resultado-header';
import {ResultadoScoreComponent} from './resultado-score';
import {ResultadoProgressComponent} from './resultado-progress';
import {ResultadoStatsComponent} from './resultado-stats';
import {ResultadoActionsComponent} from './resultado-actions';
import {ResultadoSharingComponent} from './resultado-sharing';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, ResultadoHeaderComponent, ResultadoScoreComponent, ResultadoProgressComponent, ResultadoStatsComponent, ResultadoActionsComponent, ResultadoSharingComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-app-gradient flex items-center justify-center p-4 md:p-6">
      <div class="max-w-4xl mx-auto">
        <div class="surface rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <app-resultado-header [emoji]="getEmoji()" />
          
          <app-resultado-score [resultado]="resultado" />
          
          <app-resultado-progress
            [resultado]="resultado"
            [progressBarClass]="getProgressBarClass()"
            [messageClass]="getMessageClass()"
            [messageContainerClass]="getMessageContainerClass()"
            [performanceMessage]="getPerformanceMessage()"
          />
          
          <app-resultado-stats [resultado]="resultado" />
          
          <app-resultado-actions
            (restartQuiz)="reiniciarQuiz()"
            (goHome)="voltarInicio()"
          />
          
          <app-resultado-sharing [percentage]="resultado.porcentagem" />
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