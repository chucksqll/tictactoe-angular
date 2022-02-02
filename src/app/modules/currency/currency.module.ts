import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { CurrencyComponent } from './currency.component';
import { RecentTableComponent } from './currency-components/recent-table/recent-table.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { BaseFormComponent } from './form-container/base-form/base-form.component';
import { DateFormComponent } from './form-container/date-form/date-form.component';
import { RatesFormComponent } from './form-container/rates-form/rates-form.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Currency',
      urls: [
        { title: 'Currency', url: '/currency' },
        { title: 'Currency' }
      ]
    },
    component: CurrencyComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule, ReactiveFormsModule,],
  declarations: [CurrencyComponent, 
    RecentTableComponent, FormContainerComponent, BaseFormComponent, DateFormComponent, RatesFormComponent]
})
export class CurrencyModule {

}
