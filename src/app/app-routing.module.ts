import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

/* 
El canLoad no carga el módulo si no se cumplen las condiciones, canActive ya lo 
carga o sea que es demasiado tarde para cuando se usa lazyLoad.
*/
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: '', 
    loadChildren: './income-expense/income-expense.module#IncomeExpenseModule', // Lazyload 
    canLoad: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
