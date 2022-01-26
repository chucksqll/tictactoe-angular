import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { YearlychartComponent } from './dashboard-components/yearlychart/yearlychart.component';
import { RecentTableComponent } from './dashboard-components/recent-table/recent-table.component';
import { FormContainerComponent } from './form-container/form-container.component';
import { BaseFormComponent } from './form-container/base-form/base-form.component';
import { DateFormComponent } from './form-container/date-form/date-form.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule, ReactiveFormsModule,],
  declarations: [DashboardComponent, YearlychartComponent, 
    RecentTableComponent, FormContainerComponent, BaseFormComponent, DateFormComponent]
})
export class DashboardModule {

}
