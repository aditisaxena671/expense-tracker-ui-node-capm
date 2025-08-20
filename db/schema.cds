namespace aditi.expense;

entity Users {
  key ID          : UUID;
  firstName        : String(50);
  lastName         : String(50);
  email           : String(100);
  password        : String(200);        
  createdAt       : DateTime            @cds.on.insert: $now;
  updatedAt       : DateTime            @cds.on.update: $now;

  expenses        : Composition of many Expenses
                      on expenses.user = $self;
}

entity Categories {
  key ID          : UUID;
  name            : String(50);
  description     : String;
  createdAt       : DateTime            @cds.on.insert: $now;
}

entity Expenses {
  key ID          : UUID;
  title           : String(100);
  amount          : Decimal(12,2);
  date            : Date;
  note            : String(255);

  user            : Association to Users;
  category        : Association to Categories;
  
  createdAt       : DateTime            @cds.on.insert: $now;
  updatedAt       : DateTime            @cds.on.update: $now;
}
