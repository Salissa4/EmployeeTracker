-- Use company database --
USE company;

-- insert values for department, role, and employees --
INSERT INTO department (name)
VALUES  ("CEO"),
        ("MARKETING"),
        ("ENGINEER"),
        ("SALES");

INSERT INTO role (title, salary, department_id)
VALUES  ("CEO", 400000, 1),
        ("MARKETING DIRECTOR", 300000, 2),
        ("SENIOR ENGINEER", 225000, 3),
        ("SALES DIRECTOR", 185000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Salissa", "Hernandez", 1, NULL),
        ("Adrian", "Edwards", 2, 1),
        ("Kim", "Dike", 3, 2),
        ("Lenox", "Curry", 4, 3);