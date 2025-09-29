import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoResposta } from '../../types/quiz.types';

@Component({
  selector: 'app-quiz-feedback',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-8 p-6 rounded-xl border-2" [class]="getFeedbackClass()">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-full flex items-center justify-center text-xl">
          {{ isCorrect ? '✅' : '❌' }}
        </div>
        <div class="text-current">
          <div class="font-bold text-lg text-current">{{ motivationalMessage }}</div>
          <div class="text-sm opacity-75 text-current">
            {{ isCorrect ? 'Resposta correta!' : 'Resposta incorreta' }}
          </div>
        </div>
      </div>
      
      @if (justification) {
        <div class="surface-hover rounded-lg p-4 mb-4">
          <p class="text-sm leading-relaxed">{{ justification }}</p>
        </div>
      }

      <button
        (click)="onNextQuestion()"
        class="btn-primary w-full md:w-auto px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
      >
        {{ isLastQuestion ? '🏁 Ver Resultado' : '➡️ Próxima Pergunta' }}
      </button>
    </div>
  `
})
export class QuizFeedbackComponent {
  @Input() answerState!: EstadoResposta;
  @Input() motivationalMessage!: string;
  @Input() justification!: string;
  @Input() isLastQuestion = false;
  @Output() nextQuestion = new EventEmitter<void>();

  protected get isCorrect(): boolean {
    return this.answerState === EstadoResposta.CORRETA;
  }

  protected onNextQuestion(): void {
    this.nextQuestion.emit();
  }

  protected getFeedbackClass(): string {
    return this.isCorrect ? 'feedback-correct' : 'feedback-incorrect';
  }
}