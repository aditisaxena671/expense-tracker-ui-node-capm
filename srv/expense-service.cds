using { aditi.expense as db } from '../db/schema';

service ExpenseService {
  entity Users    as projection on db.Users;
  entity Expenses as projection on db.Expenses;
  entity Categories as projection on db.Categories;
  action getTotalExpensesByUser(userId: UUID) returns { userId: UUID; total: Decimal(12,2); };

  action registerUser(firstName: String, lastName: String, email: String, password: String) returns Boolean;
  action login(email: String, password: String) returns Boolean;
}

