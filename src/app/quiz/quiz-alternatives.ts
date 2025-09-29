import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerguntaEmbaralhada } from '../types/quiz.types';
import { EstadoResposta } from '../types/quiz.types';
import { QuizAlternativeButton } from './quiz-alternative-button';

@Component({
  selector: 'app-quiz-alternatives',
  standalone: true,
  imports: [CommonModule, QuizAlternativeButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="surface rounded-xl shadow-lg p-6 md:p-8">
      <div class="flex items-start gap-4 mb-8">
        <div class="w-8 h-8 bg-indigo-context rounded-full flex items-center justify-center flex-shrink-0">
          <span class="text-indigo-context font-bold">?</span>
        </div>
        <h2 class="text-xl md:text-2xl font-semibold leading-relaxed">{{ question.pergunta }}</h2>
      </div>

      <div class="space-y-4">
        @for (alternativa of question.alternativas; track $index) {
          <div class="mb-4 last:mb-0">
            <app-quiz-alternative-button
              [alternative]="alternativa"
              [index]="$index"
              [disabled]="isAnswered"
              [buttonClass]="getAlternativeClass($index)"
              [isSelected]="isSelected($index)"
              (selectAlternative)="onSelectAlternative($event)"
            />
          </div>
        }
      </div>
    </div>
  `
})
export class QuizAlternativesComponent {
  @Input() question!: PerguntaEmbaralhada;
  @Input() selectedAlternative: number | undefined = undefined;
  @Input() answerState!: EstadoResposta;
  @Output() selectAlternative = new EventEmitter<number>();

  protected get isAnswered(): boolean {
    return this.answerState !== EstadoResposta.NAO_RESPONDIDA;
  }

  protected onSelectAlternative(index: number): void {
    this.selectAlternative.emit(index);
  }

  protected isSelected(index: number): boolean {
    return index === this.selectedAlternative;
  }

  protected getAlternativeClass(index: number): string {
    if (!this.isAnswered) {
      return 'state-neutral';
    }

    const isSelected = index === this.selectedAlternative;
    const isCorrect = index === this.question.indiceRespostaCorreta;

    let classes = [];

    if (isSelected) {
      classes.push('state-selected');
    }

    if (isCorrect) {
      classes.push('state-correct');
    } else {
      classes.push('state-incorrect');
    }

    if (!isSelected && !isCorrect) {
      classes.push('opacity-75');
    }

    return classes.join(' ');
  }
}