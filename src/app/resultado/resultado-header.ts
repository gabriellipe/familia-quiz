import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-resultado-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8">
      <div class="inline-block p-6 bg-blue-context rounded-full mb-6 animate-bounce">
        <div class="text-7xl">{{ emoji }}</div>
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Quiz Finalizado!
      </h1>
      <p class="text-lg text-muted">Veja como você se saiu</p>
    </div>
  `
})
export class ResultadoHeaderComponent {
  @Input() emoji!: string;
}