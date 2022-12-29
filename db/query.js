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
const addRole = () => {
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT id, name FROM department`,(error,results)=>{
            if (error) {
                reject(error);
            } else {
                inquirer.prompt([
                    {
                        //asks name of role
                        type:  'input',
                        name: 'title',
                        message: 'What is the name of the new role?'
                    },
                    {
                        // asks salary of role
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for the new role?'
                    },
                    {
                        // asks which department the role belongs to
                        type: 'list',
                        name: 'department',
                        message: 'What department does the new role belong to?',
                        choices: results.map(department =>{
                            // returns all of the departments
                            return {
                                name: department.name,
                                value: department.id
                            };
                        })
                    }
                ]).then(answers => {
                    // adds role to database
                    connection.query(
                        `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`,[answers.title,answers.salary,answers.department], (error,results) => {
                            if (error) {
                                reject(error);
                            } else {
                                console.log('The new role has been added to the database.');
                                resolve();
                            }
                        }
                    )
                }

                )
            }
        })
    })
}




// console logs name of the new role added to database

// adds new department
const addDepartment = () => {}
    // asks the name of the department
    // adds department to database
    // console logs name of the new department added to database

// adds new employee
const addEmployee  = () => {}
    // asks employee first name
    // asks employee last name
    // asks employee role
    // asks employee manager
    // adds employee too database
    // console logs first name last name of emplyee added too database

// updates employee
const updateRole = () =>{}
    // asks which employee to update
    // asks which role you want to assign
    // updates employee in database
    // console logs updated employee role

module.exports = {viewAllEmployees,viewAllRoles,viewAllDepartments,addRole,addDepartment,addEmployee,updateRole};