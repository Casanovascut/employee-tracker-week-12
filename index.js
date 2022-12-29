const inquirer = require('inquirer');
const mysql = require('mysql2');
// SQL connection
const { connection } = require('./connection')
// SQL retrieving values
const { viewAllEmployees,viewAllRoles,viewAllDepartments } = require('./db/query')


// create inquirer questions 
const promptMain = () => {
inquirer.prompt([ 
    // 1. multiple choice, view all departments/view all roles/view all employees/add a department/add a role/add an employee/update an employee role
    {
        type: "list",
        name: "mainMenu",
        message: "What would you like to do?",
        choices: ["View All Employees","Add Employee","Update Employee Role","View All Roles","Add Role","View All Departments","Add Department","End"]
    }
]).then(answers => {
    // view all employees
    switch (answers.mainMenu){
// view all employees = presents formated table showing employee data(id,firstName,lastName, jobTitle,department,salary,manager employee reports too)
        case 'View All Employees':
            viewAllEmployees().then(() =>{
                promptMain();
            });
                break;
//view all roles = presents job title, role id, the department the role belongs to, and the salary for the role
        case 'View All Roles':
            viewAllRoles().then(() =>{
                promptMain();
            });
                break;
// view all departments = choice presents table showing department names and id's
        case 'View All Departments':
            viewAllDepartments().then(() =>{
                promptMain();
            });
                break;
// add an employee = prompt to enter the employee firstName, lastName, manager, and is then added to database
        case 'Add Employee':
            addEmployee().then(() =>{
                promptMain();
            });
                break;
// update an employee role = prompt to select an employee to update ande their role, database is updated accordingly
        case 'Update Employee Role':
            updateRole().then(() =>{
                promptMain();
            });
                break;
// add a role = prompt to enter name,salary, and department for the role which is then added to database
        case 'Add Role':
            addRole().then(() =>{
                promptMain();
            });
                break;
// add a department = prompt to enter the name of the department which is then added to database
        case 'Add Department':
            addDepartment().then(() =>{
                promptMain();
            });
                break;
                // End the connection to the database
        case 'End':
            connection.end();
                break;
        };
})};

promptMain();