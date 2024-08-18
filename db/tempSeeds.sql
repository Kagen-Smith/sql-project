INSERT INTO department (department_id, name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal'),
       (5, 'Customer Service');

INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, 'Sales Lead', 10000010, 1),
       (2, 'Lead Engineer', 265765101, 2),
       (3, 'Account Manager', 354841465, 3),
       (4, 'Legal Team', 4500000, 4),
       (5, 'Customer Service', 46654055, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES  ('John', 'Doe', 1),
        ('Jane', 'Doe', 2),
        ('Joe', 'Brody', 3),
        ('Henry', 'Townsend', 4),
        ('James', 'Sunderland', 5);