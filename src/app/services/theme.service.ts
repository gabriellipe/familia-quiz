import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'familia-quiz:theme';
  private isDarkSource = new BehaviorSubject<boolean>(this.getInitialTheme());

  readonly isDark$ = this.isDarkSource.asObservable();

  constructor() {
    this.aplicarTema(this.isDarkSource.value);
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  toggleTheme(): void {
    const newTheme = !this.isDarkSource.value;
    this.isDarkSource.next(newTheme);
    this.aplicarTema(newTheme);
    localStorage.setItem(this.STORAGE_KEY, newTheme ? 'dark' : 'light');
  }

  private aplicarTema(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.add('light');
      html.classList.remove('dark');
    }
  }
}