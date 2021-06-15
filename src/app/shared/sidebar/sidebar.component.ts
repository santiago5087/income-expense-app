import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncomeExpenseService } from 'src/app/income-expense/income-expense/income-expense.service';


import { AppState } from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  username: string;
  avatar: string;
  subscription: Subscription;

  constructor(public authService: AuthService,
              private store: Store<AppState>,
              private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null),
        map(auth => auth.user)
      )
      .subscribe(user => {
        this.username = user.name;
        this.avatar = user.avatar;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.incomeExpenseService.cancelSubscriptions();
  }

}
