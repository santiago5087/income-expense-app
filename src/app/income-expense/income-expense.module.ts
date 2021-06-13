import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { DetailComponent } from './detail/detail.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TopUsersComponent } from './top-users/top-users.component';

// Custom Modules
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

// Pipes
import { OrderIncomeExpensePipe } from './income-expense/pipes/order-income-expense.pipe';

// Graphics
import { ChartsModule } from 'ng2-charts';

// Ngrx
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { TopUsersEffects } from './top-users/ngrx-store/top-users.effects';
import { incomeExpenseReducer } from './income-expense/ngrx-store/income-expense.reducer';
import { topUsersReducer } from './top-users/ngrx-store/top-users.reducer';
import { IncomeExpenseState } from './income-expense/ngrx-store/income-expense.reducer'
import { TopUsersState } from './top-users/ngrx-store/top-users.reducer';


export interface incomeExpenseModuleState {
  incomeExpense: IncomeExpenseState,
  topUsers: TopUsersState
}

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticComponent,
    IncomeExpenseComponent,
    DetailComponent,
    OrderIncomeExpensePipe,
    TopUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
    StoreModule.forFeature('topUsers', topUsersReducer),
    EffectsModule.forFeature([TopUsersEffects])
  ]
})
export class IncomeExpenseModule { }
