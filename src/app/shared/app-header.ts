import {Component, inject, ChangeDetectionStrategy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="p-4 border-b border-custom">
      <div class="max-w-6xl mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold cursor-pointer hover:text-primary transition-colors" (click)="goHome()">
          Quiz da Família
        </h1>
        <button 
          (click)="toggleTheme()"
          class="p-2 rounded-lg surface-hover transition-colors"
          aria-label="Alternar tema"
        >
          <span class="text-xl">{{ (themeService.isDark$ | async) ? '☀️' : '🌙' }}</span>
        </button>
      </div>
    </header>
  `
})
export class AppHeaderComponent {
  protected readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  
  protected toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  
  protected goHome(): void {
    this.router.navigate(['/']);
  }
}