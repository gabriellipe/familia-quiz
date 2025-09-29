import {Component, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-cta',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="onStartQuiz()"
      class="btn-primary w-full py-4 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
    >
      <span class="text-xl">🚀</span>
      Iniciar Quiz
      <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-0 transition-opacity duration-200"></div>
    </button>

    <div class="mt-6 flex justify-between text-sm text-muted">
      <span class="flex items-center gap-2">
        <span class="text-blue-context">⏱️</span>
        5-10 minutos
      </span>
      <span class="flex items-center gap-2">
        <span class="text-excellent">👥</span>
        Todas as idades
      </span>
    </div>
  `
})
export class HomeCtaComponent {
  @Output() startQuiz = new EventEmitter<void>();
  protected onStartQuiz(): void {
    this.startQuiz.emit();
  }
}