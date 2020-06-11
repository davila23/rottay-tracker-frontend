

-- SCHEMA 
create table  if not exists quotes (
    quotedId varchar(100) not null,
    destination varchar(100) not null,
    origin varchar(100) not null,
    description varchar(500) ,
    date DATE not null,
    primary key (quotedId)
);

create table  if not exists users (
    userId varchar(100) not null,
    firstName varchar(100) not null,
    lastName varchar(100) not null,
    primary key (userId)
);

-- DATA
with data(quotedId, destination, origin,description,date)  as (
   values
    	('4', 'Miami', 'Buenos Aires','','1991-07-30'::date),
		('2', 'San Pablo', 'Buenos Aires','','1991-07-30'::date),
		('3', 'Barcelona', 'Cordoba','','1991-07-30'::date)
) 
insert into quotes (quotedId, destination, origin,description,date)
select d.quotedId, d.destination, d.origin,d.description,d.date
from data d
WHERE NOT EXISTS (SELECT * FROM quotes);

with data(userId, firstName, lastName)  as (
   values
   	('1', 'Lucas', 'Pratto'),
	('2', 'Juan Fernando', 'Quintero'),
	('3', 'Gonzalo', 'Martinez')
) 
insert into users (userId, firstName, lastName)
select d.userId, d.firstName, d.lastName
from data d
WHERE NOT EXISTS (SELECT * FROM users);