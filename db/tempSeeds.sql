-- Seed departments
INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

-- Seed roles
INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

-- Seed employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('James', 'Sutherland', 2, 1),
    ('Henry', 'Townsend', 3, NULL),
    ('Mark', 'Fichbach', 4, 3),
    ('Jason', 'Voorhees', 5, NULL),
    ('Eric', 'Draven', 6, 5),
    ('Joe', 'Brody', 7, NULL),
    ('Paul', 'Allen', 8, 7);