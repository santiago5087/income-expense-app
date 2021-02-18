import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { DetailComponent } from './detail/detail.component';
import { StatisticComponent } from './statistic/statistic.component';
import { OrderIncomeExpensePipe } from './order-income-expense.pipe';

// Custom Modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Graphics
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticComponent,
    IncomeExpenseComponent,
    DetailComponent,
    OrderIncomeExpensePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class IncomeExpenseModule { }
