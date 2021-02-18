import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  username: string;
  subscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null),
        map(auth => auth.user.name)
      )
      .subscribe(name => this.username = name);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
