##This project was for a code challenge.
###The guidelines were:

The challenge consists of creating a simple post timeline. The posts consist of text but it can
also refer to data from employees, such as username. The employees can be added and
removed from the database (can be saved in local storage, no backend required). No logins
or other securities are required.
Path ‘/admin’
This path will enable the user to add, edit and remove employees from a database.
Requirements:
- All fields (see below) are required;
- ID and Phone are unique;
- ID cannot be changed but all the other values can;
Optional requirements:
- Username is only valid with the format [\w-_]+

Example of a list of employees could be:
ID USERNAME PHONE ROLE NAME
-- -------- --------- --------- ----
1 mathilde 992312312 CEO Mathilde Saylors
2 alia 986733455 Designer Alia Ginder
3 freeman 971232343 Developer Freeman Litten
4 piedad 992362345 Sales Piedad Dewald
5 beau 912342303 PR Beau Siegel

Path ‘/’
On this path we want to create, edit and remove posts. Similar to the Facebook timeline, on
the top you have the ability to create a new post and below the list of previous posts is
shown ordered by date.
Requirements:
- By typing ‘@’ inside a new post there should popup an autocomplete to help user
select an employee to refer in the post;

- When changing the username of an employee, it should reflect in already created
posts. A possible solution is saving the text of the post as <employee id=”1”
field=”username”></employee> instead of @mathilde, or #992312312;
Optional requirements:
- By typing ‘#’ it should popup an autocomplete to help user select the phone number;
- Inside the post, when hovering the username or name of an employee a popup
should show with the full details of that employee (name, username, phone, role);
- Possibility to edit already posted messages.

Checklist for candidate

Requirements for path “/admin”:
( ) 1) User can add, edit and remove employees;
( ) 2) All fields (ID, username, phone, role, name) are required;
( ) 3) ID and Phone are unique;
( ) 4) ID cannot be changed but all the other values can;
Requirements for path “/” for posts at “/”:
( ) 1) Users can add posts on a timeline;
( ) 2) By typing ‘@’ inside a post an autocomplete should pop up to help user select an
employee;
( ) 3) When changing the username of an employee, it should reflect in already created
posts. A possible solution is saving the text of the post as <employee id=”1”
field=”username”></employee> instead of @mathilde, or #992312312;
( ) All data is saved and retrieved by services;
( ) Although you can use external libraries, you managed to get it to work by yourself.
Evaluation criteria
( ) Checklist for candidate is completed, or an explanation for not completing any point on
the checklist is sent to be discussed;
( ) Any optional requirements completed are a plus;
( ) Code is clean and well understandable;
( ) Candidate has a keen eye for UX and details;
( ) Candidate has thought about possible problems and found solutions for them.
