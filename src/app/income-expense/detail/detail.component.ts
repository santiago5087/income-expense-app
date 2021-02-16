import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.reducer';
import { IncomeExpense } from '../IncomeExpense.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {

  items: IncomeExpense[];
  subscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

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

  deleteItem(uid: string) {
    console.log(uid);
  }

}
