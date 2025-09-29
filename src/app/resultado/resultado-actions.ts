import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoQuiz } from '../types/quiz.types';

@Component({
  selector: 'app-resultado-actions',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-4">
      <button
        (click)="onRestartQuiz()"
        class="w-full btn-primary py-4 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
      >
        <span class="text-xl">🔄</span>
        Jogar Novamente
      </button>

      <button
        (click)="onGoHome()"
        class="w-full py-4 px-8 text-lg font-medium rounded-xl border-2 border-custom surface surface-hover transition-all duration-300 flex items-center justify-center gap-3"
      >
        <span class="text-xl">🏠</span>
        Voltar ao Início
      </button>
    </div>
  `
})
export class ResultadoActionsComponent {
  @Output() restartQuiz = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();

  protected onRestartQuiz(): void {
    this.restartQuiz.emit();
  }

  protected onGoHome(): void {
    this.goHome.emit();
  }
}