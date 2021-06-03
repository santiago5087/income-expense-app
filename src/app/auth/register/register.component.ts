import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  loading: boolean;
  subscription: Subscription = new Subscription();
  
  constructor(public authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any) {
    this.authService.createUser(data.email, data.name, data.password, data.avatar);
  }

}
