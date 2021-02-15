import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '../auth/auth.service';
import { IncomeExpense } from './IncomeExpense.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private afDB: AngularFirestore,
              private authService: AuthService) { }

  createIncomeExpense(incomeExpense: IncomeExpense) {
    const user = this.authService.getUser();
    
    return this.afDB.doc(`${user.uid}/income-expense`)
      .collection('items')
      .add({ ...incomeExpense });
  }

}
