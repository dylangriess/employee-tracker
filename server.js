const express = require("express");
const inquirer = require("inquirer");
const db = require("./assets/mysqlconnect");
const cTable = require("console.table");

const PORT = process.env.PORT || 3001;
const app = express();

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
        type: "input",
        message: "What is the employee's role?:",
        name: "role_id",
        default: 1,
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
  console.log("Who would you like to update?");
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
        type: "input",
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
  console.log("Which department would you like to add?");
}

function init() {
  menuPrompt();
}

init();
