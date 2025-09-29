import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-hero',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="text-center md:text-left">
      <div class="inline-block p-6 surface-hover rounded-3xl mb-6">
        <div class="text-8xl">🧩</div>
      </div>
      <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Quiz da Família
      </h1>
      <p class="text-xl text-muted mb-8">
        Tecnologia e Educação em Família
      </p>
      <div class="flex flex-wrap gap-2 justify-center md:justify-start">
        <span class="px-3 py-1 bg-blue-context rounded-full text-sm font-medium">
          🎯 Educativo
        </span>
        <span class="px-3 py-1 bg-green-context rounded-full text-sm font-medium">
          👨‍👩‍👧‍👦 Família
        </span>
        <span class="px-3 py-1 bg-purple-context rounded-full text-sm font-medium">
          📱 Tecnologia
        </span>
      </div>
    </div>
  `
})
export class HomeHeroComponent {}