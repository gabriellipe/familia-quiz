import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoQuiz } from '../types/quiz.types';

@Component({
  selector: 'app-resultado-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8">
      <div class="w-full bg-progress-track rounded-full h-6 mb-6 overflow-hidden shadow-inner">
        <div 
          class="h-full rounded-full transition-all duration-2000 ease-out flex items-center justify-end pr-2"
          [class]="progressBarClass"
          [style.width]="resultado.porcentagem + '%'"
        >
          <div class="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
        </div>
      </div>

      <div class="p-6 rounded-2xl border-2" [class]="messageContainerClass">
        <p class="text-xl font-bold mb-2" [class]="messageClass">
          {{ resultado.mensagem }}
        </p>
        <p class="text-sm opacity-75">{{ performanceMessage }}</p>
      </div>
    </div>
  `
})
export class ResultadoProgressComponent {
  @Input() resultado!: ResultadoQuiz;
  @Input() progressBarClass!: string;
  @Input() messageClass!: string;
  @Input() messageContainerClass!: string;
  @Input() performanceMessage!: string;
}