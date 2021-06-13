import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { UserTop } from '../../models/userTop.model';
import { incomeExpenseModuleState } from '../income-expense.module';
import { LOAD_TOPUSERS } from './ngrx-store/top-users.actions';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit, OnDestroy {

  users: UserTop[];
  subscription: Subscription;
  loading: boolean;
  error: any;

  constructor(private store: Store<incomeExpenseModuleState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('topUsers')
      .subscribe(topUsers => {
        console.log(topUsers)
        this.users = topUsers.topUsers;
        this.loading = topUsers.loading;
        this.error = topUsers.error;
      });
    this.store.dispatch(LOAD_TOPUSERS());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
