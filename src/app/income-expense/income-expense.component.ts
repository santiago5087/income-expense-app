import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { IncomeExpenseService } from './income-expense.service';
import { IncomeExpense } from './IncomeExpense.model';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styles: [
  ]
})
export class IncomeExpenseComponent implements OnInit {

  addIncomeExpenseForm: FormGroup;
  type = 'income';

  constructor(private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.addIncomeExpenseForm = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.min(0))
    });
  }

  createIncomeExpense() {
    const incomeExpense = new IncomeExpense({ ...this.addIncomeExpenseForm.value, type: this.type });
    this.incomeExpenseService.createIncomeExpense(incomeExpense)
      .then(() => {
        Swal.fire('Created', incomeExpense.description, 'success');
        this.addIncomeExpenseForm.reset({
          amount: 0
        });
      });
  }

}
