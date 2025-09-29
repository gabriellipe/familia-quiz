import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoQuiz } from '../../types/quiz.types';

@Component({
  selector: 'app-resultado-stats',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `
})
export class ResultadoStatsComponent {
  @Input() resultado!: ResultadoQuiz;
}