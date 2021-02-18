import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SingleDataSet, Label } from 'ng2-charts';

import { AppState } from '../../app.reducer';
import { IncomeExpense } from '../IncomeExpense.model';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styles: [
  ]
})
export class StatisticComponent implements OnInit {

  incomes: number;
  expenses: number;
  howManyIncomes: number;
  howManyExpenses: number;
  subscription: Subscription = new Subscription();
  public doughnutChartLabels: Label = ['Incomes', 'Expenses'];
  public doughnutChartData: SingleDataSet = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('incomeExpense')
      .subscribe(incomeExpense => {
        this.countIncomeExpense(incomeExpense.items);
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
