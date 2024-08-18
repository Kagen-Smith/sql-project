DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department {
    id SERIAL PRIMARY KEY,
    dep_name VARCHAR(30) UNIQUE NOT NULL
};

CREATE TABLE role {
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary INTEGER,
    department INTEGER
};

CREATE TABLE employee {
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
}