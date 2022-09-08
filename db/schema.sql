
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

-- create parent table -> departments
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
);

-- creates roles table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- creates employee table
CREATE TABLE employee (
	id INT PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	role_id INT NOT NULL,
	FOREIGN KEY (role_id)
	REFERENCES roles(id),
	manager_id INT NOT NULL,
	FOREIGN KEY (manager_id)
	REFERENCES employee(id)
	ON DELETE SET NULL
);