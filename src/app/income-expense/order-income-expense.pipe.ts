import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpense } from './IncomeExpense.model';

@Pipe({
  name: 'orderIncomeExpense'
})
export class OrderIncomeExpensePipe implements PipeTransform {

  transform(items: IncomeExpense[]): IncomeExpense[] {
    // Hay que usar el método slice ya que el arreglo se encuentra 'frozen' o el spread operator
    return [...items].sort((a, b) => {
      if(a.type == 'income') return -1;
      else return 1;
    });
  }

}
