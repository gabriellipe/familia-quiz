import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-completion',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="max-w-md mx-auto surface rounded-xl shadow-lg p-8 text-center">
      <div class="text-6xl mb-4">🎯</div>
      <h2 class="text-3xl font-bold mb-4">Quiz Finalizado!</h2>
      <p class="text-lg mb-6 text-muted">Redirecionando para os resultados...</p>
      <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  `
})
export class QuizCompletionComponent {}