import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-quiz-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="surface rounded-xl shadow-lg p-6 mb-6">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
            {{ currentQuestion }}
          </div>
          <div>
            <h1 class="text-lg font-semibold">Quiz da Família</h1>
            <span class="text-sm text-muted">Pergunta {{ progressText }}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-muted">Acertos</div>
          <div class="text-2xl font-bold text-primary">{{ score }}</div>
        </div>
      </div>
      
      <div class="w-full bg-progress-track rounded-full h-3 overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-500 ease-out"
          [style.width]="progressWidth + '%'"
        ></div>
      </div>
      <div class="text-xs text-muted mt-2 text-center">
        {{ progressWidth | number:'1.0-0' }}% concluído
      </div>
    </div>
  `
})
export class QuizProgressComponent {
  @Input() currentQuestion!: number;
  @Input() progressText!: string;
  @Input() score!: number;
  @Input() progressWidth!: number;
}