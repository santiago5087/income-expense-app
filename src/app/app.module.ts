import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NGRX
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Graphics
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeExpenseComponent } from './income-expense/income-expense.component';
import { StatisticComponent } from './income-expense/statistic/statistic.component';
import { DetailComponent } from './income-expense/detail/detail.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OrderIncomeExpensePipe } from './income-expense/order-income-expense.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IncomeExpenseComponent,
    StatisticComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrderIncomeExpensePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: environment.production 
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
