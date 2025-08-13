using aditi.expense from '../db/schema';

service ExpenseService {
  entity Users as projection on expense.Users;
  entity Expenses as projection on expense.Expenses;
}
