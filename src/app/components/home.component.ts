import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 md:p-6">
      <div class="max-w-4xl mx-auto">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <!-- Coluna esquerda - Logo e intro -->
          <div class="text-center md:text-left">
            <div class="inline-block p-6 bg-white/10 dark:bg-black/10 rounded-3xl mb-6">
              <div class="text-8xl">🧩</div>
            </div>
            <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Quiz da Família
            </h1>
            <p class="text-xl text-muted mb-8">
              Tecnologia e Educação em Família
            </p>
            <div class="flex flex-wrap gap-2 justify-center md:justify-start">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                🎯 Educativo
              </span>
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                👨‍👩‍👧‍👦 Família
              </span>
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                📱 Tecnologia
              </span>
            </div>
          </div>

          <!-- Coluna direita - Card principal -->
          <div class="surface rounded-2xl shadow-xl p-8">
            <!-- Descrição -->
            <div class="mb-8">
              <h2 class="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-sm">?</span>
                </div>
                Como funciona?
              </h2>
              <div class="grid gap-4">
                <div class="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    10
                  </div>
                  <div>
                    <div class="font-semibold text-blue-800 dark:text-blue-200">Perguntas inteligentes</div>
                    <div class="text-sm text-blue-600 dark:text-blue-400">Sobre uso consciente de tecnologia</div>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div class="font-semibold text-green-800 dark:text-green-200">Alternativas cada</div>
                    <div class="text-sm text-green-600 dark:text-green-400">Com explicações educativas</div>
                  </div>
                </div>
                
                <div class="flex items-start gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div class="font-semibold text-purple-800 dark:text-purple-200">Feedback imediato</div>
                    <div class="text-sm text-purple-600 dark:text-purple-400">Aprenda com cada resposta</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Objetivo -->
            <div class="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
              <h3 class="text-lg font-semibold mb-3 text-indigo-800 dark:text-indigo-200 flex items-center gap-2">
                <span class="text-xl">💡</span> Objetivo
              </h3>
              <p class="text-indigo-700 dark:text-indigo-300 text-sm leading-relaxed">
                Fortalecer a parceria entre família e escola no uso equilibrado da tecnologia, 
                promovendo reflexões sobre hábitos digitais saudáveis e educação consciente.
              </p>
            </div>

            <!-- Botão de iniciar -->
            <button
              (click)="iniciarQuiz()"
              class="btn-primary w-full py-4 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span class="text-xl">🚀</span>
              Iniciar Quiz
              <div class="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-0 transition-opacity duration-200"></div>
            </button>

            <!-- Informações extras -->
            <div class="mt-6 flex justify-between text-sm text-muted">
              <span class="flex items-center gap-2">
                <span class="text-blue-500">⏱️</span>
                5-10 minutos
              </span>
              <span class="flex items-center gap-2">
                <span class="text-green-500">👥</span>
                Todas as idades
              </span>
            </div>
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