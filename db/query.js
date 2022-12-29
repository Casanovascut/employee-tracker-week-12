const inquirer = require('inquirer');
const mysql = require('mysql2');
// SQL connection
const { connection } = require('../connection')

// promise to view all roles
const viewAllRoles = () => {
    return new Promise((resolve, reject) => {
    connection.query('SELECT role. *, department.name FROM role JOIN department ON role.department_id = department.id;',    (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// promise to view all employees
const viewAllEmployees = () => {
    return new Promise((resolve, reject) => {
    connection.query(`SELECT employee.*,role.title FROM employee JOIN role ON employee.role_id = role.id;            `, (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// promise to view all departments
const viewAllDepartments = () => {
    return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employeetracker_db.department;', (error, results) => {
        if (error) {
            reject(error);
        } else {
            console.table(results);
            resolve();
        }
        });
    });
};

// adds new role
addRole()
    //asks name of role
    // asks salary of role
    // asks which department the role belongs to
    // adds role to database
    // console logs name of the new role added to database

// adds new department
addDepartment()
    // asks the name of the department
    // adds department to database
    // console logs name of the new department added to database

// adds new employee
addEmployee()
    // asks employee first name
    // asks employee last name
    // asks employee role
    // asks employee manager
    // adds employee too database
    // console logs first name last name of emplyee added too database

// updates employee
updateRole()
    // asks which employee to update
    // asks which role you want to assign
    // updates employee in database
    // console logs updated employee role

module.exports = {viewAllEmployees,viewAllRoles,viewAllDepartments,addRole,addDepartment,addEmployee,updateRole};