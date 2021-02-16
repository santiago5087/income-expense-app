import { Component, OnInit } from '@angular/core';
import { IncomeExpenseService } from '../income-expense/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.incomeExpenseService.initIncomeExpenseListener();
  }

}
