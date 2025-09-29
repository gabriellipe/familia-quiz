import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoQuiz } from '../types/quiz.types';

@Component({
  selector: 'app-resultado-score',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
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
  `
})
export class ResultadoScoreComponent {
  @Input() resultado!: ResultadoQuiz;
}