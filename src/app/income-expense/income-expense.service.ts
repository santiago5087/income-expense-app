import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { SetItemsAction, UnsetItemsAction } from './income-expense.actions';
import { IncomeExpense } from './IncomeExpense.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  incomeExpenseListenerSubs: Subscription = new Subscription();
  incomeExpenseItemsSubs: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>) { }

  initIncomeExpenseListener() {
    this.incomeExpenseListenerSubs = this.store.select('auth')
      .pipe(filter(auth => auth.user != null))
      .subscribe(auth => {
        this.incomeExpenseItems(auth.user.uid);
      });
  }

  private incomeExpenseItems(uid: string) {
    this.incomeExpenseItemsSubs = this.afDB.collection(`${uid}/income-expense/items`)
      .snapshotChanges()
      .pipe(map(docData => {
        return docData.map(doc => {
          let item = { ...doc.payload.doc.data() as Object }
          item['uid'] = doc.payload.doc.id;
          
          return item;
        });
      }))
      .subscribe((collection: any) => {
        this.store.dispatch(new SetItemsAction(collection));
      });
  }

  createIncomeExpense(incomeExpense: IncomeExpense) {
    const user = this.authService.getUser();
    
    return this.afDB.doc(`${user.uid}/income-expense`)
      .collection('items')
      .add({ ...incomeExpense });
  }

  deleteIncomeExpense(uid: string) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/income-expense/items/${uid}`)
      .delete();
  }

  cancelSubscriptions() {
    this.incomeExpenseListenerSubs.unsubscribe();
    this.incomeExpenseItemsSubs.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

}
