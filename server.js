const express = require("express");
const inquirer = require("inquirer");
const db = require("./assets/mysqlconnect");
const cTable = require("console.table");

function menuPrompt() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "menuChoice",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit Employee Tracker",
      ],
    })
    .then((answer) => {
      switch (answer.menuChoice) {
        case "View All Employees":
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          viewRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          viewDepartments();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Quit Employee Tracker":
          console.log("Thank you for using!");
          process.exit();
        default:
          process.exit();
      }
    });
}

function viewEmployees() {
  console.log("Here is a list of employees!:");
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.department_name, employees.manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const table = cTable.getTable(results);
      console.log(table);
      menuPrompt();
    }
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter employee's first name:",
        name: "first_name",
      },
      {
        type: "input",
        message: "Please enter employee's last name:",
        name: "last_name",
      },
      {
        type: "list",
        choices: [
          { name: "Sales Lead", value: 1 },
          { name: "Salesperson", value: 2 },
          { name: "Lead Engineer", value: 3 },
          { name: "Software Engineer", value: 4 },
          { name: "Account Manager", value: 5 },
          { name: "Accountant", value: 6 },
          { name: "Legal Team Lead", value: 7 },
          { name: "Lawyer", value: 8 },
        ],
        message: "What is the employee's role?:",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the employee's manager ID?:",
        name: "manager_id",
        default: 1,
      },
    ])
    .then((choices) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
        ("${choices.first_name}",
				"${choices.last_name}",
				"${choices.role_id}",
				"${choices.manager_id}")`
      );
      console.log(`Employee has been added!`);
      menuPrompt();
    });
}

function updateEmployee() {
  let employees = [];
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, employee) => {
    if (err) {
      console.log(err);
    } else {
      employees = employee.map(({ first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            choices: employees,
            message: "Choose an employee to update:",
            name: "name",
          },
          {
            type: "list",
            choices: [
              { name: "Sales Lead", value: 1 },
              { name: "Salesperson", value: 2 },
              { name: "Lead Engineer", value: 3 },
              { name: "Software Engineer", value: 4 },
              { name: "Account Manager", value: 5 },
              { name: "Accountant", value: 6 },
              { name: "Legal Team Lead", value: 7 },
              { name: "Lawyer", value: 8 },
            ],
            message: "Please enter a new role ID for employee:",
            name: "role_id",
          },
        ])
        .then((choices) => {
          db.query(
            `UPDATE employees SET role_id = "${
              choices.role_id
            }" WHERE first_name = "${choices.name.split(" ")[0]}"`,
            (err, result) => {
              if (err) throw err;
              console.log("Employee role has been updated!");
              menuPrompt();
            }
          );
        });
    }
  });
}

function viewRoles() {
  console.log("Here is a list of roles!:");
  const sql = `SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles JOIN departments ON roles.department_id = departments.id`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const table = cTable.getTable(results);
      console.log(table);
      menuPrompt();
    }
  });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the title of the role:",
        name: "title",
      },
      {
        type: "input",
        message: "Please enter the salary for the role:",
        name: "salary",
      },
      {
        type: "list",
        choices: [
          { name: "Engineering", value: 1 },
          { name: "Finance", value: 2 },
          { name: "Legal", value: 3 },
          { name: "Sales", value: 4 },
        ],
        message: "What is the department ID for this role?",
        name: "department_id",
        default: 1,
      },
    ])
    .then((choices) => {
      db.query(
        `INSERT INTO roles (title, salary, department_id) VALUES 
      ("${choices.title}",
      "${choices.salary}",
      "${choices.department_id}")`
      );
      console.log(`Role has been added!`);
      menuPrompt();
    });
}

function viewDepartments() {
  console.log("Here is a list of departments!:");
  const sql = `SELECT * from departments`;
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      const table = cTable.getTable(results);
      console.log(table);
      menuPrompt();
    }
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the name of the department:",
        name: "department_name",
      },
    ])
    .then((choices) => {
      db.query(
        `INSERT INTO departments (department_name) VALUES 
      ("${choices.department_name}")`
      );
      console.log(`Department has been added!`);
      menuPrompt();
    });
}

function init() {
  menuPrompt();
}

init();
