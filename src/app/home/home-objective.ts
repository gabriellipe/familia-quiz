import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-objective',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8 p-6 bg-indigo-context rounded-xl border border-indigo-context">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <span class="text-xl">💡</span> Objetivo
      </h3>
      <p class="text-sm leading-relaxed opacity-90">
        Fortalecer a parceria entre família e escola no uso equilibrado da tecnologia, 
        promovendo reflexões sobre hábitos digitais saudáveis e educação consciente.
      </p>
    </div>
  `
})
export class HomeObjectiveComponent {}