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
  const sql = `SELECT * from employees`;
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
  console.log("Who would you like to add?");
}

function updateEmployee() {
  console.log("Who would you like to update?");
}

function viewRoles() {
  console.log("Here is a list of roles!:");
}

function addRole() {
  console.log("Which role would you like to add?");
}

function viewDepartments() {
  console.log("Here is a list of departments!:");
}

function addDepartment() {
  console.log("Which department would you like to add?");
}

function init() {
  menuPrompt();
}

init();
