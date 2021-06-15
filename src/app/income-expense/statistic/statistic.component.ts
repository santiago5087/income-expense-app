import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SingleDataSet, Label } from 'ng2-charts';

import { incomeExpenseModuleState } from '../income-expense.module';
import { IncomeExpense } from '../income-expense/models/IncomeExpense.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {

  incomes: number;
  expenses: number;
  howManyIncomes: number;
  howManyExpenses: number;
  subscription: Subscription = new Subscription();
  public doughnutChartLabels: Label = ['Incomes', 'Expenses'];
  public doughnutChartData: SingleDataSet = [];

  constructor(private store: Store<incomeExpenseModuleState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('incomeExpense')
      .subscribe(ie => {
        this.countIncomeExpense(ie.items);
      });
  }

  countIncomeExpense(items: IncomeExpense[]) {
    this.incomes = 0;
    this.expenses = 0;
    this.howManyIncomes = 0;
    this.howManyExpenses = 0;

    items.forEach(item => {
      if(item.type == 'income') {
        this.incomes += item.amount;
        this.howManyIncomes ++;
      } else {
        this.expenses += item.amount;
        this.howManyExpenses ++;
      }
    });

    this.doughnutChartData = [this.incomes, this.expenses];
  }

}
