import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizService } from './services/quiz.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen surface">
      <header class="p-4 border-b border-custom">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <h1 class="text-2xl font-bold">Quiz da Família</h1>
          <button 
            (click)="toggleTheme()"
            class="p-2 rounded-lg surface-hover transition-colors"
            aria-label="Alternar tema"
          >
            <span class="text-xl">{{ (themeService.isDark$ | async) ? '☀️' : '🌙' }}</span>
          </button>
        </div>
      </header>

      <main class="max-w-6xl mx-auto">
        <router-outlet />
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  protected readonly quizService = inject(QuizService);
  protected readonly themeService = inject(ThemeService);

  ngOnInit(): void {
    this.quizService.carregarPerguntas().subscribe();
  }

  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}