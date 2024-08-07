import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full',
  },
  {
    path: 'calculator',
    loadComponent: () => import('./pages/calculator/calculator.page').then( m => m.CalculatorPage)
  },
];
