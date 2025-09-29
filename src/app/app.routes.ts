import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./components/quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path: 'resultado',
    loadComponent: () => import('./components/resultado/resultado').then(m => m.ResultadoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];