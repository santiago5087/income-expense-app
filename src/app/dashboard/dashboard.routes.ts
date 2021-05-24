import { Routes } from "@angular/router";

import { DetailComponent } from "../income-expense/detail/detail.component";
import { IncomeExpenseComponent } from "../income-expense/income-expense.component";
import { StatisticComponent } from "../income-expense/statistic/statistic.component";
import { TopUsersComponent } from "../income-expense/top-users/top-users.component";

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'income-expense', component: IncomeExpenseComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'top-users', component: TopUsersComponent }
]