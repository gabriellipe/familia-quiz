import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/quiz.component').then(m => m.QuizComponent)
  },
  {
    path: 'resultado',
    loadComponent: () => import('./components/resultado.component').then(m => m.ResultadoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];