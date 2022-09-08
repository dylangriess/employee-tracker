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
          updateEmployeeRole();
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

        default:
          process.exit();
      }
    });
}

function init() {
  menuPrompt();
}

init();
