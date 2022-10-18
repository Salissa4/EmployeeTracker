DROP DATABASE IF EXISTS company;
CREATE DATABASE company;

USE company;

CREATE TABLE department (
    id INT PRIMARY KEY,
    name VARCHAR(30).
);

CREATE TABLE role (
    id INT PRIMARY KEY-- would i use AUTO_INCREMENT --,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY -- would i use AUTO_INCREMENT --,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT, -- how do i set null, NOT NULL? --
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);