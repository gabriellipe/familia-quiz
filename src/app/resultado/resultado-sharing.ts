import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-resultado-sharing',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mt-8 pt-6 border-t border-custom">
      <p class="text-sm text-muted mb-4">Compartilhe seu resultado:</p>
      <div class="inline-block px-4 py-2 bg-card-subtle rounded-lg text-sm text-muted">
        🧩 Consegui {{ percentage }}% no Quiz da Família!
      </div>
    </div>
  `
})
export class ResultadoSharingComponent {
  @Input() percentage!: number;
}