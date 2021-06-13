import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { AppState } from '../../app.reducer';
import { ActivateLoadingAction, DeactivateLoadingAction } from '../../shared/ui.actions';
import { IncomeExpenseService } from './income-expense.service';
import { IncomeExpense } from './models/IncomeExpense.model';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: [
  ]
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  addIncomeExpenseForm: FormGroup;
  type = 'income';
  loadingSubs: Subscription = new Subscription();
  loading: boolean;

  constructor(private incomeExpenseService: IncomeExpenseService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.addIncomeExpenseForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(0))
    });

    this.loadingSubs = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  createIncomeExpense() {
    this.store.dispatch(new ActivateLoadingAction());
    const incomeExpense = new IncomeExpense({ ...this.addIncomeExpenseForm.value, type: this.type });
    this.incomeExpenseService.createIncomeExpense(incomeExpense)
      .then(() => {
        this.store.dispatch(new DeactivateLoadingAction());
        Swal.fire('Created', incomeExpense.description, 'success');
        this.addIncomeExpenseForm.reset({
          amount: 0
        });
      });
  }

}
