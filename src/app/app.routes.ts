import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz').then(m => m.QuizComponent)
  },
  {
    path: 'resultado',
    loadComponent: () => import('./resultado/resultado').then(m => m.ResultadoComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];