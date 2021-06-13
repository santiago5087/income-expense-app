import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Custom modules
import { AuthModule } from './auth/auth.module';
// import { IncomeExpenseModule } from './income-expense/income-expense.module';

// NGRX
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TopUsersEffects } from './income-expense/top-users/ngrx-store/top-users.effects';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { IncomeExpenseModule } from './income-expense/income-expense.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    HttpClientModule,
    AppRoutingModule,
    IncomeExpenseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: environment.production 
    }),
    EffectsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
