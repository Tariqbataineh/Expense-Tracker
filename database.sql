CREATE TABLE expenses (

id SERIAL PRIMARY KEY,

title VARCHAR(100) NOT NULL,

amount DECIMAL(10,2) NOT NULL,

category VARCHAR(50) NOT NULL,

date DATE NOT NULL

);



INSERT INTO expenses
(title,amount,category,date)

VALUES

('Food',10,'Food','2026-09-24'),

('Taxi',5,'Transport','2026-09-24');