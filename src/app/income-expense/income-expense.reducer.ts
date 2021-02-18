import * as fromIncomeExpense from './income-expense.actions';
import { IncomeExpense } from './IncomeExpense.model'
import { AppState } from '../app.reducer';

// Apariencia del estado
export interface IncomeExpenseState {
  items: IncomeExpense[];
}

const initState: IncomeExpenseState = {
  items: []
}

export interface InExAppState extends AppState {
  incomeExpense: IncomeExpenseState;
}

export function incomeExpenseReducer(state=initState, 
                action: fromIncomeExpense.actions): IncomeExpenseState {
  switch(action.type) {
    case fromIncomeExpense.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => {
            return { ...item } 
          })
        ]
      }

    case fromIncomeExpense.UNSET_ITEMS:
      return { items: [] }
    
    default:
      return state;
  }
}