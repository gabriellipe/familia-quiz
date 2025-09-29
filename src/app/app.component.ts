import {Component, OnInit, inject, ChangeDetectionStrategy} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {QuizService} from './services/quiz.service';
import {AppHeaderComponent} from './shared/app-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen surface">
      <app-header />
      
      <main class="max-w-6xl mx-auto">
        <router-outlet />
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  protected readonly quizService = inject(QuizService);
  
  ngOnInit(): void {
    this.quizService.carregarPerguntas().subscribe();
  }
}