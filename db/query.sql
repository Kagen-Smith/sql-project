SELECT * FROM department;


SELECT 
    role.id AS "Role ID", 
    role.title AS "Title", 
    role.salary AS "Salary", 
    department.name AS "Department"
FROM 
    role
JOIN 
    department ON role.department_id = department.id;


SELECT 
    employee.id AS "Employee ID",
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name",
    role.title AS "Title",
    role.salary AS "Salary",
    department.name AS "Department",
    CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
FROM
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN
    department ON role.department_id = department.id
LEFT JOIN
    employee manager ON employee.manager_id = manager.id;



INSERT INTO department (name)
VALUES ($1)
RETURNING *;


INSERT INTO role (title, salary, department_id)
VALUES ($1, $2, $3)
RETURNING *;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ($1, $2, $3, $4)
RETURNING *;

UPDATE employee
SET role_id = $1
WHERE id = $2;


UPDATE employee
SET manager_id = $1
WHERE id = $2;

SELECT employee.id, employee.first_name, employee.last_name
FROM employee
WHERE employee.manager_id = $1;


SELECT 
    employee.id AS "Employee ID",
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name",
    role.title AS "Title",
    role.salary AS "Salary",
    department.name AS "Department",
    CONCAT(manager.first_name, ' ', manager.last_name) AS "Manager"
FROM
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN
    department ON role.department_id = department.id
LEFT JOIN
    employee manager ON employee.manager_id = manager.id
WHERE
    department.name = $1;


DELETE FROM department
WHERE id = $1;

-- Delete role
DELETE FROM role
WHERE id = $1;

DELETE FROM employee
WHERE id = $1;

SELECT SUM(role.salary) AS "Total Combined Salaries" 
FROM employee
JOIN role ON employee.role_id = role.id; 