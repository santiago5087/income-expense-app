export class IncomeExpense {

  description: string;
  amount: number;
  type: string;
  uid?: string;

  constructor(obj) {
    this.description = obj && obj.description || null;
    this.amount = obj && obj.amount || null;
    this.type = obj && obj.type || null;
  }

}

interface DataObj {
  description: string;
  amount: number;
  type: string;
  uid?: string;
}
