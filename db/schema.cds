namespace aditi.expense;

entity Users {
  ID         : UUID;
  username   : String;
  email      : String;
  expenses   : Association to many Expenses on expenses.user = $self;
}

entity Expenses {
  ID         : UUID;
  title      : String;
  amount     : Decimal(10,2);
  category   : String;
  date       : Date;
  note       : String;
  user       : Association to Users;
}
