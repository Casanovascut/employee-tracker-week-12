const inquirer = require('inquirer');
const mysql = require('mysql2');
const { connection } = require('./connection')

// create inquirer questions 

// 1. multiple choice, view all departments/view all roles/view all employees/add a department/add a role/add an employee/update an employee role

// view all departments = choice presents table showing department names and id's

//view all roles = presents job title, role id, the department the role belongs to, and the salary for the role

// view all employees = presents formated table showing employee data(id,firstName,lastName, jobTitle,department,salary,manager employee reports too)

// add a department = prompt to enter the name of the department which is then added to database

// add a role = prompt to enter name,salary, and department for the role which is then added to database

// add an employee = prompt to enter the employee firstName, lastName, manager, and is then added to database

// update an employee role = prompt to select an employee to update ande their role, database is updated accordingly