import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Alternativa} from '../types/quiz.types';

@Component({
  selector: 'app-quiz-alternative-button',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="onSelect()"
      [disabled]="disabled"
      [class]="buttonClass"
      class="w-full p-5 rounded-xl text-left transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 alternative-hover cursor-pointer"
    >
      <div class="flex items-start gap-3">
        <div class="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0 mt-1">
        </div>
        <span class="font-medium leading-relaxed text-lg md:text-base">{{ alternative.texto }}</span>
      </div>
    </button>
  `
})
export class QuizAlternativeButton {
  @Input() alternative!: Alternativa;
  @Input() index!: number;
  @Input() disabled = false;
  @Input() buttonClass = 'state-neutral';
  @Input() isSelected = false;
  @Output() selectAlternative = new EventEmitter<number>();
  protected onSelect(): void {
    if (!this.disabled) {
      this.selectAlternative.emit(this.index);
    }
  }
}