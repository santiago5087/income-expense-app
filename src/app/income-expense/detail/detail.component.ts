import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { incomeExpenseModuleState } from '../income-expense.module';
import { IncomeExpenseService } from '../income-expense/income-expense.service';
import { IncomeExpense } from '../income-expense/models/IncomeExpense.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IncomeExpense[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<incomeExpenseModuleState>,
              private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.subscription = this.store.select('incomeExpense')
      .subscribe(incomeExpense => {
        this.items = incomeExpense.items;
        console.log(this.items);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteItem(item: IncomeExpense) {
    this.incomeExpenseService.deleteIncomeExpense(item.uid)
      .then(() => {
        Swal.fire('Deleted', item.description, 'success');
      })
  }

}
