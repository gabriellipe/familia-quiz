import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { HomeHeroComponent } from './home/home-hero.component';
import { HomeFeaturesComponent } from './home/home-features.component';
import { HomeObjectiveComponent } from './home/home-objective.component';
import { HomeCtaComponent } from './home/home-cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeHeroComponent, HomeFeaturesComponent, HomeObjectiveComponent, HomeCtaComponent],
  template: `
    <div class="min-h-screen bg-app-gradient flex items-center justify-center p-4 md:p-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <app-home-hero />
          
          <div class="surface rounded-2xl shadow-xl p-8">
            <app-home-features />
            <app-home-objective />
            <app-home-cta (startQuiz)="iniciarQuiz()" />
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);

  iniciarQuiz(): void {
    // Reinicia o quiz para garantir novas perguntas
    this.quizService.reiniciarQuiz();
    this.quizService.carregarPerguntas().subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }
}