drop table Transactions
drop table Accounts
drop table Users

create table Users (
	Id int identity(1, 1),
	Email varchar(255) not null,
	FirstName varchar(255),
	LastName varchar(255),
	FullName varchar(255),

	primary key (Id),
	unique(Email)
);


create table Accounts (
	AccountNumber int identity(1000000000, 1),
	UserId int not null,
	Name varchar(255) default('Primary'),
	Type varchar(255) default('Checking'),
	Balance numeric default(0),

	primary key (AccountNumber),
	foreign key (UserId) references Users(Id),
);

create table Transactions (
	Id int identity(1, 1),
	AccountNumber int not null,
	Amount numeric not null,
	TransactionDate date default(getDate()),
	CounterpartyName varchar(255),
	CounterpartyAccountNumber int,
	
	primary key (Id),
	foreign key (AccountNumber) references Accounts(AccountNumber),
	foreign key (CounterpartyAccountNumber) references Accounts(AccountNumber)
);