import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FullComponent } from './modules/layouts/full/full.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/currency', pathMatch: 'full' },
      {
        path: 'currency',
        loadChildren: () => import('./modules/currency/currency.module').then(m => m.CurrencyModule)
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/currency'
  }
];
