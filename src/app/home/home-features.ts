import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home-features',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-6 flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
          <span class="text-white text-sm">?</span>
        </div>
        Como funciona?
      </h2>
      <div class="grid gap-4">
        <div class="flex items-start gap-4 p-4 bg-blue-context rounded-xl">
          <div class="w-8 h-8 text-blue-context bg-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            10
          </div>
          <div>
            <div class="font-semibold">Perguntas inteligentes</div>
            <div class="text-sm opacity-75">Sobre uso consciente de tecnologia</div>
          </div>
        </div>
        
        <div class="flex items-start gap-4 p-4 bg-green-context rounded-xl">
          <div class="w-8 h-8 text-excellent bg-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
            4
          </div>
          <div>
            <div class="font-semibold">Alternativas cada</div>
            <div class="text-sm opacity-75">Com explicações educativas</div>
          </div>
        </div>
        
        <div class="flex items-start gap-4 p-4 bg-purple-context rounded-xl">
          <div class="w-8 h-8 text-purple-context bg-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
            ⚡
          </div>
          <div>
            <div class="font-semibold">Feedback imediato</div>
            <div class="text-sm opacity-75">Aprenda com cada resposta</div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeFeaturesComponent {}